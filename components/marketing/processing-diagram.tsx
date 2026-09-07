"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * The transaction diagram on /processing, animated.
 *
 * One loop is a whole transaction, matching the five steps written out
 * further down that page: the customer starts a withdrawal, the request
 * crosses the encrypted link to the network, the network answers, and the
 * answer comes back down the same path to the machine.
 *
 * Everything is timed against one `CYCLE` constant so the beats stay in step
 * if the pace is adjusted. The animation only runs while the diagram is on
 * screen, and collapses to the finished still under `prefers-reduced-motion`.
 */

/** Seconds for one complete request-and-response. */
const CYCLE = 5.6;

/** When each beat fires, in seconds from the top of the cycle. */
const T = {
  wake: 0,
  requestOut: 0.35,
  linkPulseOut: 1.15,
  requestIn: 1.5,
  networkWork: 2.35,
  replyOut: 3.0,
  linkPulseBack: 3.65,
  replyIn: 3.95,
  dispense: 4.8,
} as const;

const ACCENT = "#ddc52b";
const ACCENT_DEEP = "#c9b21f";
const INK = "#141414";
const LINE = "#e8e6df";
const INK_SOFT = "#5a5a5a";

/** A loop that fires once per cycle at `delay`, then waits out the rest. */
function beat(delay: number, duration: number) {
  return {
    duration,
    delay,
    repeat: Infinity,
    repeatDelay: Math.max(0, CYCLE - duration),
    ease: "easeInOut",
  } as const;
}

/**
 * A datum crossing one segment of the path. Two per direction, because the
 * link card sits between the segments — a single dot spanning the whole width
 * would slide across the card's face rather than through the system.
 */
function Packet({
  from,
  to,
  delay,
  colour,
}: {
  from: number;
  to: number;
  delay: number;
  colour: string;
}) {
  const travel = 0.85;
  const timing = beat(delay, travel);

  return (
    <g>
      <motion.circle
        r="9"
        cy="160"
        fill={colour}
        opacity={0.18}
        initial={{ cx: from, opacity: 0 }}
        animate={{ cx: [from, to], opacity: [0, 0.18, 0.18, 0] }}
        transition={timing}
      />
      <motion.circle
        r="4"
        cy="160"
        fill={colour}
        initial={{ cx: from, opacity: 0 }}
        animate={{ cx: [from, to], opacity: [0, 1, 1, 0] }}
        transition={timing}
      />
    </g>
  );
}

export function ProcessingDiagram({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  // Kept mounted either way; this only decides whether the loop is running,
  // so an off-screen diagram is not animating for nobody.
  const inView = useInView(ref, { margin: "0px 0px -80px 0px" });
  const run = !reduceMotion && inView;

  return (
    <svg
      ref={ref}
      viewBox="0 0 720 320"
      role="img"
      aria-labelledby="processing-diagram-title"
      className={className}
    >
      <title id="processing-diagram-title">
        A transaction travelling from the ATM over an encrypted link to the
        processing network, and the authorisation returning by the same path
      </title>

      <rect width="720" height="320" rx="18" fill="#f7f6f2" />

      {/*
       * The connectors. The dashes drift continuously so the path reads as a
       * live line even between packets; the discrete dots above are the
       * individual transaction.
       */}
      <motion.g
        stroke={ACCENT}
        strokeWidth="2"
        strokeDasharray="4 7"
        strokeLinecap="round"
        fill="none"
        animate={run ? { strokeDashoffset: [0, -22] } : { strokeDashoffset: 0 }}
        transition={
          run
            ? { duration: 1.4, repeat: Infinity, ease: "linear" }
            : { duration: 0 }
        }
      >
        <path d="M168 160h104" />
        <path d="M376 160h104" />
      </motion.g>

      {run ? (
        <>
          <Packet
            from={168}
            to={272}
            delay={T.requestOut}
            colour={ACCENT_DEEP}
          />
          <Packet
            from={376}
            to={480}
            delay={T.requestIn}
            colour={ACCENT_DEEP}
          />
          <Packet from={480} to={376} delay={T.replyOut} colour={INK} />
          <Packet from={272} to={168} delay={T.replyIn} colour={INK} />
        </>
      ) : null}

      <g
        fill={INK}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="14"
        textAnchor="middle"
      >
        {/* The machine. */}
        <g>
          <rect
            x="48"
            y="104"
            width="120"
            height="112"
            rx="16"
            fill="#ffffff"
            stroke={LINE}
          />
          {/* The screen wakes as the customer starts, and confirms at the end. */}
          <motion.rect
            x="76"
            y="126"
            width="64"
            height="42"
            rx="8"
            fill={ACCENT}
            animate={run ? { opacity: [0.45, 1, 1, 0.45] } : { opacity: 1 }}
            transition={run ? beat(T.wake, 1.2) : { duration: 0 }}
          />
          {/* Cash: the bars slide out once the reply lands. */}
          <motion.rect
            x="76"
            y="178"
            width="64"
            height="8"
            rx="4"
            fill={INK}
            animate={
              run
                ? { opacity: [0.16, 0.16, 0.5, 0.16], x: [0, 0, 4, 0] }
                : { opacity: 0.16 }
            }
            transition={run ? beat(T.dispense, 0.7) : { duration: 0 }}
          />
          <motion.rect
            x="76"
            y="192"
            width="42"
            height="8"
            rx="4"
            fill={INK}
            animate={
              run
                ? { opacity: [0.1, 0.1, 0.4, 0.1], x: [0, 0, 4, 0] }
                : { opacity: 0.1 }
            }
            transition={run ? beat(T.dispense + 0.08, 0.7) : { duration: 0 }}
          />
          <text x="108" y="248" fill={INK_SOFT}>
            Halo II ATM
          </text>
        </g>

        {/* The encrypted link. */}
        <g>
          <rect
            x="272"
            y="104"
            width="104"
            height="112"
            rx="16"
            fill="#ffffff"
            stroke={LINE}
          />
          {/* A ring that expands out of the globe as each packet passes. */}
          <motion.circle
            cx="324"
            cy="160"
            r="28"
            fill="none"
            stroke={ACCENT}
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={
              run
                ? { opacity: [0, 0.55, 0], scale: [0.8, 1.35] }
                : { opacity: 0 }
            }
            transition={run ? beat(T.linkPulseOut, 0.9) : { duration: 0 }}
            style={{ transformOrigin: "324px 160px" }}
          />
          <motion.circle
            cx="324"
            cy="160"
            r="28"
            fill="none"
            stroke={INK}
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={
              run
                ? { opacity: [0, 0.35, 0], scale: [0.8, 1.35] }
                : { opacity: 0 }
            }
            transition={run ? beat(T.linkPulseBack, 0.9) : { duration: 0 }}
            style={{ transformOrigin: "324px 160px" }}
          />
          {/*
           * The globe stays upright. Rotating it in-plane tilts the meridians
           * off-axis and it stops reading as a globe; the expanding rings
           * above carry the "link is live" idea on their own.
           */}
          <g>
            <path
              d="M324 132a28 28 0 1 0 0 56 28 28 0 1 0 0-56Z"
              fill="none"
              stroke={ACCENT_DEEP}
              strokeWidth="2.5"
            />
            <path
              d="M296 160h56M324 132c-14 16-14 40 0 56M324 132c14 16 14 40 0 56"
              fill="none"
              stroke={ACCENT_DEEP}
              strokeWidth="1.6"
              opacity="0.75"
            />
          </g>
          <text x="324" y="248" fill={INK_SOFT}>
            Encrypted link
          </text>
        </g>

        {/* The processing network. */}
        <g>
          <rect
            x="480"
            y="104"
            width="192"
            height="112"
            rx="16"
            fill="#ffffff"
            stroke={LINE}
          />
          {/*
           * The three rows read top to bottom as the network working: the
           * request lands, the account is checked, the answer is written.
           */}
          <motion.rect
            x="508"
            y="126"
            width="136"
            height="20"
            rx="8"
            fill={INK}
            animate={run ? { opacity: [0.08, 0.24, 0.08] } : { opacity: 0.08 }}
            transition={run ? beat(T.networkWork, 0.7) : { duration: 0 }}
          />
          <motion.rect
            y="152"
            height="20"
            rx="8"
            fill={ACCENT}
            initial={{ x: 508, width: 136 }}
            animate={run ? { width: [36, 136, 136] } : { width: 136 }}
            transition={run ? beat(T.networkWork + 0.1, 1) : { duration: 0 }}
          />
          <motion.rect
            x="508"
            y="178"
            width="136"
            height="20"
            rx="8"
            fill={INK}
            animate={run ? { opacity: [0.08, 0.24, 0.08] } : { opacity: 0.08 }}
            transition={run ? beat(T.networkWork + 0.25, 0.7) : { duration: 0 }}
          />
          <text x="576" y="248" fill={INK_SOFT}>
            Processing network
          </text>
        </g>
      </g>

      {/* The two labels brighten as their leg of the journey is travelled. */}
      <g
        fill={INK_SOFT}
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        letterSpacing="2"
        textAnchor="middle"
      >
        <motion.text
          x="220"
          y="146"
          animate={run ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
          transition={run ? beat(T.requestOut, 1.1) : { duration: 0 }}
        >
          REQUEST
        </motion.text>
        <motion.text
          x="428"
          y="146"
          animate={run ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
          transition={run ? beat(T.requestIn, 1.1) : { duration: 0 }}
        >
          AUTHORISE
        </motion.text>
      </g>
    </svg>
  );
}
