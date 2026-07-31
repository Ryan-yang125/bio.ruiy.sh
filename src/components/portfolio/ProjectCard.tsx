"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { LocaleText, type LocalizedCopy } from "./LocaleText";
import {
  type AccordionHeaderProps,
  type AccordionPanelProps,
  useAutoHeight,
} from "./interior/accordion";
import { usePressDepth } from "./interior/press-depth";

const PRESS = { type: "spring", stiffness: 520, damping: 34, mass: 0.45 } as const;
const DISCLOSE = { type: "spring", stiffness: 480, damping: 40, mass: 0.6 } as const;
const CHEVRON = { type: "spring", stiffness: 700, damping: 46, mass: 0.5 } as const;
const ENTER_EASE = [0.23, 1, 0.32, 1] as const;
const EXIT_EASE = [0.4, 0, 1, 1] as const;
const INSTANT = { duration: 0 } as const;

type ProjectDetails = Readonly<{
  overview: LocalizedCopy;
  highlights: readonly LocalizedCopy[];
  resource: Readonly<{
    href: string;
    label: LocalizedCopy;
  }>;
}>;

export type Project = Readonly<{
  number: string;
  title: string;
  type: LocalizedCopy;
  summary: LocalizedCopy;
  detail: LocalizedCopy;
  focus: LocalizedCopy;
  href: string;
  details: ProjectDetails;
}>;

type ProjectCardProps = Project & {
  open: boolean;
  headerProps: AccordionHeaderProps;
  panelProps: AccordionPanelProps;
};

type Inertable = HTMLDivElement & { inert?: boolean };

export function ProjectCard({
  number,
  title,
  type,
  summary,
  detail,
  focus,
  href,
  details,
  open,
  headerProps,
  panelProps,
}: ProjectCardProps) {
  const reduced = Boolean(useReducedMotion());
  const { height, ready, ref: detailsRef } = useAutoHeight();
  const {
    pressed: visitPressed,
    origin: visitOrigin,
    ref: visitRef,
    bind: visitBind,
  } = usePressDepth();

  useEffect(() => {
    const panel = detailsRef.current as Inertable | null;
    if (!panel) return;

    panel.inert = !open;
    return () => {
      panel.inert = false;
    };
  }, [detailsRef, open]);

  return (
    <motion.article
      className="project-card"
      layout="position"
      transition={reduced ? INSTANT : { layout: DISCLOSE }}
    >
      <div className="project-card-head">
        <span className="project-number">{number}</span>
        <motion.a
          ref={visitRef}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="project-visit"
          aria-label={`Open ${title}`}
          animate={{
            y: visitPressed ? 1 : 0,
            scale: visitPressed ? 0.94 : 1,
          }}
          transition={reduced ? INSTANT : PRESS}
          style={{
            transformPerspective: 900,
            transformOrigin: visitOrigin
              ? `${50 + visitOrigin.x * 8}% ${50 + visitOrigin.y * 8}%`
              : "center",
          }}
          onPointerDown={visitBind.onPointerDown}
          onKeyDown={visitBind.onKeyDown}
          onKeyUp={visitBind.onKeyUp}
          onBlur={visitBind.onBlur}
        >
          <span aria-hidden="true">↗</span>
        </motion.a>
      </div>

      <div className="project-card-content">
        <h3>{title}</h3>
        <p className="project-summary"><LocaleText copy={summary} /></p>
        <p className="project-detail"><LocaleText copy={detail} /></p>
      </div>

      <div className="project-disclosure">
        <button
          {...headerProps}
          className="project-details-toggle"
          aria-label={`Toggle ${title} project details`}
          data-testid={`project-details-${number}`}
        >
          <span className="project-details-label">
            <LocaleText copy={{ en: "Project notes", zh: "项目说明" }} />
          </span>
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 256 256"
            fill="none"
            aria-hidden="true"
            className="project-details-chevron"
            initial={false}
            animate={{ rotate: open ? 180 : 0 }}
            transition={reduced ? INSTANT : CHEVRON}
          >
            <polyline
              points="208 96 128 176 48 96"
              stroke="currentColor"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </button>

        <motion.div
          className="project-details-clip"
          initial={false}
          animate={ready ? { height: open ? height : 0 } : {}}
          transition={reduced ? INSTANT : DISCLOSE}
          style={{
            height: ready ? undefined : open ? "auto" : 0,
            overflow: "hidden",
          }}
        >
          <div {...panelProps} ref={detailsRef} className="project-details-panel">
            <motion.div
              className="project-details-body"
              initial={false}
              animate={{ opacity: open ? 1 : 0, y: open ? 0 : -4 }}
              transition={
                reduced
                  ? INSTANT
                  : open
                    ? { opacity: { duration: 0.18, ease: ENTER_EASE }, y: DISCLOSE }
                    : { opacity: { duration: 0.14, ease: EXIT_EASE }, y: DISCLOSE }
              }
            >
              <p className="project-details-overview"><LocaleText copy={details.overview} /></p>
              <ul className="project-details-list">
                {details.highlights.map((highlight, index) => (
                  <li key={`${title}-${index}`}><LocaleText copy={highlight} /></li>
                ))}
              </ul>
              <a
                className="project-readme-link"
                href={details.resource.href}
                target="_blank"
                rel="noreferrer"
              >
                <LocaleText copy={details.resource.label} /> <span aria-hidden="true">↗</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="project-card-foot">
        <span className="project-type"><LocaleText copy={type} /></span>
        <span className="project-focus"><LocaleText copy={focus} /></span>
      </div>
    </motion.article>
  );
}
