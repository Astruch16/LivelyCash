/**
 * Minimal fixed-window rate limiting behind a swappable store interface.
 *
 * The in-memory store below is correct for local development and for a single
 * long-lived Node process. It is NOT correct on serverless infrastructure,
 * where each instance keeps its own Map and instances are recycled freely.
 *
 * TODO(production): on Vercel, swap `memoryRateLimitStore` for an Upstash Redis
 * backed implementation of `RateLimitStore` — `@upstash/ratelimit` plus
 * `@upstash/redis`, configured with `Ratelimit.slidingWindow(MAX_REQUESTS,
 * "10 m")` and read from `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`.
 * Nothing outside this file needs to change: the route handler only depends on
 * the `RateLimitStore` interface. The Upstash dependency is deliberately not
 * installed yet.
 */

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  /** Epoch milliseconds at which the current window expires. */
  resetAt: number;
};

export interface RateLimitStore {
  check(key: string): Promise<RateLimitResult>;
}

export const MAX_REQUESTS = 3;
export const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

type Bucket = {
  count: number;
  resetAt: number;
};

/**
 * Buckets are hung off `globalThis` so a dev-server hot reload does not hand
 * out a fresh, empty limiter on every edit.
 */
const globalForRateLimit = globalThis as typeof globalThis & {
  __livelyCashRateLimitBuckets?: Map<string, Bucket>;
};

const buckets =
  globalForRateLimit.__livelyCashRateLimitBuckets ??
  (globalForRateLimit.__livelyCashRateLimitBuckets = new Map<string, Bucket>());

/** Drops expired buckets so the Map cannot grow without bound. */
function evictExpired(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export const memoryRateLimitStore: RateLimitStore = {
  async check(key: string): Promise<RateLimitResult> {
    const now = Date.now();

    // Cheap amortised cleanup — this endpoint sees very low traffic.
    if (buckets.size > 500) evictExpired(now);

    const existing = buckets.get(key);

    if (!existing || existing.resetAt <= now) {
      const resetAt = now + WINDOW_MS;
      buckets.set(key, { count: 1, resetAt });
      return {
        success: true,
        limit: MAX_REQUESTS,
        remaining: MAX_REQUESTS - 1,
        resetAt,
      };
    }

    existing.count += 1;

    return {
      success: existing.count <= MAX_REQUESTS,
      limit: MAX_REQUESTS,
      remaining: Math.max(0, MAX_REQUESTS - existing.count),
      resetAt: existing.resetAt,
    };
  },
};

/**
 * Best-effort client IP. Behind Vercel/most proxies `x-forwarded-for` is the
 * comma-separated chain with the original client first.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    "unknown"
  );
}
