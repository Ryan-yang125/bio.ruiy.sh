import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, SubmitEventHandler } from "react";

type Line = {
  id: number;
  type: "command" | "system" | "error";
  text: string;
};

const initialLines: Line[] = [
  { id: 0, type: "command", text: "what are you working on?" },
  {
    id: 1,
    type: "system",
    text: "Image2Studio, publishing tools, Agent Skills, and a better personal website.",
  },
];

const commandMap: Record<string, string> = {
  help: "commands: about · now · projects · activity · contact · clear",
  about:
    "Ryan Yang — independent AI product developer in Shanghai, building the last mile of AI work.",
  now: "Currently: Image2Studio, publishing tools, Agent Skills, and this personal site.",
  projects:
    "Image2Studio · ChatLLM-Web · DropHere · CheckHere · Motion Lexicon",
  activity: "Jumping to the latest public GitHub activity.",
  contact: "ruiyang0012@gmail.com · x.com/ruiyanghim · github.com/Ryan-yang125",
};

const commandTargets: Record<string, string> = {
  now: "#now",
  projects: "#projects",
  activity: "#activity",
  contact: "#contact",
};

const suggestions = ["help", "now", "projects", "activity", "contact"];

export default function Terminal() {
  const [value, setValue] = useState("");
  const [lines, setLines] = useState<Line[]>(initialLines);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const commandHistoryRef = useRef<string[]>([]);
  const commandIndexRef = useRef(0);
  const nextIdRef = useRef(2);

  const runCommand = useCallback((raw: string) => {
    const command = raw.trim().toLowerCase();
    if (!command) return;

    commandHistoryRef.current.push(command);
    commandIndexRef.current = commandHistoryRef.current.length;

    if (command === "clear") {
      setLines([]);
      return;
    }

    const output = commandMap[command];
    setLines((current) => [
      ...current,
      { id: nextIdRef.current++, type: "command", text: command },
      {
        id: nextIdRef.current++,
        type: output ? "system" : "error",
        text:
          output ?? `command not found: ${command}. type help for the list.`,
      },
    ]);

    const target = commandTargets[command];
    if (target) document.querySelector(target)?.scrollIntoView();
  }, []);

  useEffect(() => {
    const history = historyRef.current;
    if (history) history.scrollTop = history.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const focusTerminal = (event: globalThis.KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName ?? "";
      if (event.key === "/" && !/input|textarea/i.test(activeTag)) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", focusTerminal);
    return () => document.removeEventListener("keydown", focusTerminal);
  }, []);

  const submit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    runCommand(value);
    setValue("");
  };

  const navigateHistory = (event: KeyboardEvent<HTMLInputElement>) => {
    const history = commandHistoryRef.current;
    if (event.key === "Escape") event.currentTarget.blur();
    if (!history.length) return;

    if (event.key === "ArrowUp") {
      event.preventDefault();
      commandIndexRef.current = Math.max(0, commandIndexRef.current - 1);
      setValue(history[commandIndexRef.current] ?? "");
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      commandIndexRef.current = Math.min(
        history.length,
        commandIndexRef.current + 1,
      );
      setValue(history[commandIndexRef.current] ?? "");
    }
  };

  return (
    <div className="command">
      <div className="command-head">~/ryan — interactive shell</div>
      <div className="command-body">
        <div className="terminal-history" aria-live="polite" ref={historyRef}>
          {lines.map((line) => (
            <div className={`terminal-line ${line.type}`} key={line.id}>
              {line.type === "command" ? (
                <span className="prompt">➜</span>
              ) : null}
              <span className={line.type === "system" ? "output" : undefined}>
                {line.text}
              </span>
            </div>
          ))}
        </div>
        <form className="terminal-form" onSubmit={submit}>
          <label className="visually-hidden" htmlFor="terminal-input">
            Type a command
          </label>
          <span className="prompt">➜</span>
          <input
            className="terminal-input"
            id="terminal-input"
            name="command"
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            onKeyDown={navigateHistory}
            autoComplete="off"
            spellCheck={false}
            placeholder="type help"
          />
          <button className="visually-hidden" type="submit">
            Run
          </button>
        </form>
        <div className="command-suggestions" aria-label="Suggested commands">
          {suggestions.map((command) => (
            <button
              key={command}
              type="button"
              onClick={() => {
                runCommand(command);
                inputRef.current?.focus();
              }}
            >
              {command}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
