import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Sitewide Open Graph / Twitter card, rendered to a PNG at build time.
 * Individual pages inherit this unless they define their own.
 *
 * Colours are literals rather than tokens: Satori resolves no CSS variables,
 * and the values are the same palette defined in `app/globals.css`.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
        padding: "72px",
        color: "#141414",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 1.7 21 6.85V17.15L12 22.3 3 17.15V6.85Z"
            stroke="#ddc52b"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 9.43v5.14L12 17.15l4.5-2.58V9.43L12 6.85"
            stroke="#ddc52b"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 2 }}>
            LIVELY
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 14,
              letterSpacing: 6,
              color: "#5a5a5a",
            }}
          >
            CASH ATMS
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            fontSize: 66,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            maxWidth: 940,
          }}
        >
          Own it, share it, or host it.
        </div>
        <div
          style={{
            display: "flex",
            width: 72,
            height: 5,
            background: "#ddc52b",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#5a5a5a",
            maxWidth: 900,
          }}
        >
          Three ATM programs on Hyosung Halo II hardware, with local service and
          transparent revenue sharing.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 20,
          letterSpacing: 4,
          color: "#5a5a5a",
          borderTop: "1px solid #e8e6df",
          paddingTop: 28,
        }}
      >
        CHILLIWACK · ABBOTSFORD · AGASSIZ · HOPE · HARRISON
      </div>
    </div>,
    size,
  );
}
