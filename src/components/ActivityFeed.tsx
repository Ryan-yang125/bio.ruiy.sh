import { useEffect, useState } from "react";

type ActivityItem = {
  title: string;
  detail: string;
  time: string;
  url: string;
};

type GitHubEvent = {
  type: string;
  created_at: string;
  repo: { name: string };
};

const fallbackActivity: ActivityItem[] = [
  {
    title: "Working on Image2Studio",
    detail: "Ryan-yang125 / gpt-image-2-prompts",
    time: "CURRENT",
    url: "https://image2studio.com",
  },
  {
    title: "Maintaining ChatLLM-Web",
    detail: "Ryan-yang125 / ChatLLM-Web",
    time: "630★",
    url: "https://github.com/Ryan-yang125/ChatLLM-Web",
  },
  {
    title: "Publishing small agent tools",
    detail: "DropHere · CheckHere · Skill Manager",
    time: "2026",
    url: "https://github.com/Ryan-yang125",
  },
];

const usefulTypes = new Set([
  "PushEvent",
  "CreateEvent",
  "PullRequestEvent",
  "IssuesEvent",
  "ReleaseEvent",
]);

const labels: Record<string, string> = {
  PushEvent: "Pushed code",
  CreateEvent: "Created something new",
  PullRequestEvent: "Updated a pull request",
  IssuesEvent: "Worked on an issue",
  ReleaseEvent: "Published a release",
};

function relativeTime(value: string) {
  const minutes = Math.max(
    1,
    Math.round((Date.now() - Date.parse(value)) / 60000),
  );
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function describeEvents(events: GitHubEvent[]) {
  const seen = new Set<string>();
  const items: ActivityItem[] = [];

  for (const event of events) {
    if (!usefulTypes.has(event.type)) continue;
    const key = `${event.type}:${event.repo.name}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const repoName = event.repo.name.replace("Ryan-yang125/", "");
    items.push({
      title: labels[event.type] ?? "Updated public work",
      detail: repoName === "Ryan-yang125" ? "profile README" : repoName,
      time: relativeTime(event.created_at),
      url: `https://github.com/${event.repo.name}`,
    });
    if (items.length === 4) break;
  }

  return items;
}

export default function ActivityFeed() {
  const [items, setItems] = useState<ActivityItem[]>(fallbackActivity);
  const [state, setState] = useState("LOCAL SNAPSHOT");

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/Ryan-yang125/events/public?per_page=30",
          {
            headers: { Accept: "application/vnd.github+json" },
            signal: controller.signal,
          },
        );
        if (!response.ok) throw new Error(`GitHub ${response.status}`);
        const nextItems = describeEvents(
          (await response.json()) as GitHubEvent[],
        );
        if (nextItems.length) {
          setItems(nextItems);
          setState("LIVE FROM GITHUB");
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setState("LOCAL SNAPSHOT");
        }
      }
    };

    const idleId = window.requestIdleCallback(load, { timeout: 1800 });
    return () => {
      window.cancelIdleCallback(idleId);
      controller.abort();
    };
  }, []);

  return (
    <div className="activity-grid">
      <div className="activity-feed reveal">
        {items.map((item) => (
          <a
            className="activity-item"
            href={item.url}
            key={`${item.title}:${item.detail}`}
            target="_blank"
            rel="noreferrer"
          >
            <i className="activity-dot" aria-hidden="true" />
            <span className="activity-copy">
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </span>
            <span className="activity-time">{item.time}</span>
          </a>
        ))}
      </div>
      <aside className="activity-card reveal">
        <small>PUBLIC SIGNAL</small>
        <div>
          <strong>66</strong>
          <p>
            public repositories across AI, graphics, tools, and experiments.
          </p>
        </div>
        <div className="activity-state">
          <i aria-hidden="true" />
          <span>{state}</span>
        </div>
      </aside>
    </div>
  );
}
