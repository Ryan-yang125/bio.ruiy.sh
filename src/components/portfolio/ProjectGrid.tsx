"use client";

import { useMemo } from "react";
import { useAccordion } from "./interior/accordion";
import { ProjectCard, type Project } from "./ProjectCard";

type ProjectGridProps = {
  projects: readonly Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  const entries = useMemo(
    () => projects.map((project) => ({ id: project.number })),
    [projects],
  );
  const { headerProps, isOpen, panelProps } = useAccordion({
    items: entries,
    type: "multiple",
  });

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.title}
          {...project}
          open={isOpen(project.number)}
          headerProps={headerProps(project.number)}
          panelProps={panelProps(project.number)}
        />
      ))}
    </div>
  );
}
