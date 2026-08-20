import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  periods,
  education,
  skillGroups,
  softSkillList,
} from "../../data/cv";

import TerminalOutput from "./TerminalOutput";

type OutputType =
  | "default"
  | "muted"
  | "error"
  | "success"
  | "command";

type HistoryEntry = {
  id: number;
  content: React.ReactNode;
  type?: OutputType;
};

const COMMANDS = [
  "help",
  "about",
  "cv",
  "skills",
  "education",
  "contact",
  "clear",
  "exit",
];

export default function TerminalIsland() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] =
    useState(false);
  const [isMaximized, setIsMaximized] =
    useState(false);

  const [command, setCommand] = useState("");

  const [history, setHistory] = useState<
    HistoryEntry[]
  >([]);

  const [commandHistory, setCommandHistory] =
    useState<string[]>([]);

  const [historyIndex, setHistoryIndex] =
    useState(-1);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const outputRef =
    useRef<HTMLDivElement>(null);

  const historyId = useRef(0);

  function openTerminal() {
    setIsOpen(true);
    setIsMinimized(false);
  }

  function closeTerminal() {
    setIsOpen(false);
    setIsMinimized(false);
    setIsMaximized(false);
    setCommand("");
    setHistoryIndex(-1);
  }

  function minimizeTerminal() {
    setIsMinimized(true);
  }

  function restoreTerminal() {
    setIsMinimized(false);
  }

  function toggleMaximize() {
    setIsMaximized((current) => !current);
    setIsMinimized(false);
  }

  function addHistory(
    content: React.ReactNode,
    type: OutputType = "default",
  ) {
    historyId.current += 1;

    setHistory((current) => [
      ...current,
      {
        id: historyId.current,
        content,
        type,
      },
    ]);
  }

  function clearTerminal() {
    setHistory([]);
  }

  function executeCommand(
    rawCommand: string,
  ) {
    const value = rawCommand.trim();

    if (!value) {
      return;
    }

    const normalized = value.toLowerCase();

    setCommandHistory((current) => [
      ...current.filter(
        (item) => item !== value,
      ),
      value,
    ]);

    setHistoryIndex(-1);

    addHistory(
      <span>
        <span className="text-neutral-400">
          $
        </span>{" "}
        {value}
      </span>,
      "command",
    );

    switch (normalized) {
      case "help":
        addHistory(
          <div className="space-y-1">
            <p className="text-neutral-900 dark:text-neutral-100">
              Available commands:
            </p>

            <div className="mt-3 grid grid-cols-[110px_1fr] gap-x-4 gap-y-1 text-neutral-500 dark:text-neutral-400">
              <span>about</span>
              <span>À propos</span>

              <span>cv</span>
              <span>Parcours professionnel</span>

              <span>skills</span>
              <span>Compétences</span>

              <span>education</span>
              <span>Formation</span>

              <span>contact</span>
              <span>Contact</span>

              <span>clear</span>
              <span>Effacer le terminal</span>

              <span>exit</span>
              <span>Fermer</span>
            </div>
          </div>,
        );

        break;

      case "about":
        addHistory(
          <div className="space-y-3">
            <p className="text-neutral-900 dark:text-neutral-100">
              Justin Sillou
            </p>

            <p className="text-neutral-500 dark:text-neutral-400">
              Développeur Fullstack — Lille,
              Hauts-de-France
            </p>

            <p className="text-neutral-500 dark:text-neutral-400">
              Backend · Web · DevOps
            </p>
          </div>,
        );

        break;

      case "cv":
        addHistory(
          <div className="space-y-6">
            {periods.map((group) => (
              <div key={group.label}>
                <p className="text-neutral-400 dark:text-neutral-500">
                  {group.label}
                </p>

                <div className="mt-2 space-y-4">
                  {group.items.map(
                    (experience) => (
                      <div
                        key={`${experience.company}-${experience.period}`}
                      >
                        <p className="text-neutral-900 dark:text-neutral-100">
                          {experience.role}
                        </p>

                        <p className="text-neutral-500 dark:text-neutral-400">
                          {experience.company}
                          {" · "}
                          {experience.contract}
                        </p>

                        {experience.projects && (
                          <div className="mt-2 pl-4 border-l border-neutral-200 dark:border-neutral-800 space-y-2">
                            {experience.projects.map(
                              (project) => (
                                <div
                                  key={
                                    project.name
                                  }
                                >
                                  <p className="text-neutral-700 dark:text-neutral-300">
                                    {project.name}
                                  </p>

                                  <p className="text-neutral-400 dark:text-neutral-500">
                                    {
                                      project.description
                                    }
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>,
        );

        break;

      case "skills":
        addHistory(
          <div className="space-y-5">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <p className="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  {group.title}
                </p>

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {group.skills.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="text-neutral-700 dark:text-neutral-300"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>
            ))}

            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Compétences transversales
              </p>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-neutral-500 dark:text-neutral-400">
                {softSkillList.map(
                  (skill) => (
                    <span key={skill}>
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>,
        );

        break;

      case "education":
        addHistory(
          <div className="space-y-5">
            {education.map((item) => (
              <div key={item.degree}>
                <p className="text-neutral-900 dark:text-neutral-100">
                  {item.degree}
                </p>

                <p className="text-neutral-500 dark:text-neutral-400">
                  {item.school}
                </p>
              </div>
            ))}
          </div>,
        );

        break;

      case "contact":
        addHistory(
          <div className="space-y-2">
            <p className="text-neutral-900 dark:text-neutral-100">
              Contact
            </p>

            <p className="text-neutral-500 dark:text-neutral-400">
              Les informations de contact
              sont disponibles sur le site.
            </p>
          </div>,
        );

        break;

      case "clear":
        clearTerminal();
        break;

      case "exit":
      case "quit":
        closeTerminal();
        break;

      default:
        addHistory(
          <div>
            <p>
              Command not found:{" "}
              <span className="text-neutral-900 dark:text-neutral-100">
                {value}
              </span>
            </p>

            <p className="mt-1 text-neutral-400 dark:text-neutral-500">
              Type "help" to see available
              commands.
            </p>
          </div>,
          "error",
        );
    }
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    executeCommand(command);
    setCommand("");
  }

  function handleInputKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!commandHistory.length) {
        return;
      }

      const nextIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(
              0,
              historyIndex - 1,
            );

      setHistoryIndex(nextIndex);
      setCommand(
        commandHistory[nextIndex] ?? "",
      );
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex === -1) {
        return;
      }

      const nextIndex =
        historyIndex + 1;

      if (
        nextIndex >=
        commandHistory.length
      ) {
        setHistoryIndex(-1);
        setCommand("");
        return;
      }

      setHistoryIndex(nextIndex);
      setCommand(
        commandHistory[nextIndex] ?? "",
      );
    }

    if (
      event.key === "l" &&
      (event.ctrlKey || event.metaKey)
    ) {
      event.preventDefault();
      clearTerminal();
    }

    if (event.key === "Tab") {
      event.preventDefault();

      const current =
        command.trim().toLowerCase();

      if (!current) {
        return;
      }

      const matches = COMMANDS.filter(
        (item) =>
          item.startsWith(current),
      );

      if (matches.length === 1) {
        setCommand(matches[0]);
      }
    }
  }

  useEffect(() => {
    if (!isOpen || isMinimized) {
      return;
    }

    const timeout = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        closeTerminal();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.clearTimeout(timeout);

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (!outputRef.current) {
      return;
    }

    outputRef.current.scrollTop =
      outputRef.current.scrollHeight;
  }, [history]);

  /*
   * Mobile :
   * on ne rend absolument rien sous md.
   */
  return (
    <div className="hidden md:block">
      {!isOpen && (
        <button
          type="button"
          onClick={openTerminal}
          aria-label="Ouvrir le terminal"
          className="
            fixed
            bottom-5
            left-5
            z-40
            w-8
            h-8
            flex
            items-center
            justify-center
            cv-mono
            text-sm
            text-neutral-300
            dark:text-neutral-700
            hover:text-neutral-600
            dark:hover:text-neutral-400
            transition-colors
            select-none
          "
        >
          $
        </button>
      )}

      {isOpen && isMinimized && (
        <button
          type="button"
          onClick={restoreTerminal}
          className="
            fixed
            bottom-0
            left-5
            z-50
            flex
            items-center
            gap-3
            h-9
            px-4
            rounded-t-md
            border
            border-neutral-300
            dark:border-neutral-700
            bg-white
            dark:bg-neutral-950
            shadow-lg
            cv-mono
            text-xs
            text-neutral-600
            dark:text-neutral-400
            hover:text-neutral-900
            dark:hover:text-neutral-100
            transition-colors
          "
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />

          terminal

          <span className="text-neutral-300 dark:text-neutral-700">
            $
          </span>
        </button>
      )}

      {isOpen && !isMinimized && (
        <>
          <div
            className="
              fixed
              inset-0
              z-40
              bg-neutral-950/10
              dark:bg-black/30
              backdrop-blur-[2px]
            "
            onClick={closeTerminal}
          />

          <section
            className={`
              fixed
              z-50
              overflow-hidden
              flex
              flex-col
              rounded-lg
              border
              border-neutral-300
              dark:border-neutral-700
              bg-white
              dark:bg-neutral-950
              shadow-2xl

              ${
                isMaximized
                  ? "left-[5vw] top-[5vh] w-[90vw] h-[90vh]"
                  : "left-6 bottom-6 w-[760px] h-[70vh] max-h-[720px]"
              }
            `}
            aria-label="Terminal"
          >
            {/* Header */}
            <header
              className="
                relative
                shrink-0
                h-11
                flex
                items-center
                justify-between
                px-4
                border-b
                border-neutral-200
                dark:border-neutral-800
                bg-neutral-50
                dark:bg-neutral-900
              "
            >
              {/* Boutons macOS */}
                <div className="flex items-center gap-2">
                {/* Fermer */}
                <button
                    type="button"
                    onClick={closeTerminal}
                    aria-label="Fermer"
                    className="
                    group
                    w-3
                    h-3
                    rounded-full
                    bg-[#ff5f57]
                    flex
                    items-center
                    justify-center
                    transition-transform
                    hover:scale-110
                    "
                >
                    <span
                    className="
                        opacity-0
                        group-hover:opacity-100
                        text-[8px]
                        leading-none
                        text-[#8a1c17]
                        font-semibold
                    "
                    >
                    ×
                    </span>
                </button>

                {/* Réduire */}
                <button
                    type="button"
                    onClick={minimizeTerminal}
                    aria-label="Réduire"
                    className="
                    group
                    w-3
                    h-3
                    rounded-full
                    bg-[#febc2e]
                    flex
                    items-center
                    justify-center
                    transition-transform
                    hover:scale-110
                    "
                >
                    <span
                    className="
                        opacity-0
                        group-hover:opacity-100
                        text-[7px]
                        leading-none
                        text-[#7a5200]
                        font-semibold
                    "
                    >
                    −
                    </span>
                </button>

                {/* Agrandir */}
                <button
                    type="button"
                    onClick={toggleMaximize}
                    aria-label={
                    isMaximized
                        ? "Restaurer"
                        : "Agrandir"
                    }
                    className="
                    group
                    w-3
                    h-3
                    rounded-full
                    bg-[#28c840]
                    flex
                    items-center
                    justify-center
                    transition-transform
                    hover:scale-110
                    "
                >
                    <span
                    className="
                        opacity-0
                        group-hover:opacity-100
                        text-[7px]
                        leading-none
                        text-[#12631c]
                        font-semibold
                    "
                    >
                    {isMaximized ? "<" : ">"}
                    </span>
                </button>
            </div>
              <span
                className="
                    absolute
                    left-1/2
                    -translate-x-1/2
                    cv-mono
                    text-[11px]
                    text-neutral-400
                    dark:text-neutral-500
                    select-none
                "
                >
                terminal
                </span>

              <button
                type="button"
                onClick={closeTerminal}
                className="
                  cv-mono
                  text-xs
                  text-neutral-400
                  dark:text-neutral-500
                  hover:text-neutral-900
                  dark:hover:text-neutral-100
                  transition-colors
                "
              >
                esc
              </button>
            </header>

            {/* Terminal */}
            <div
              ref={outputRef}
              onClick={() =>
                inputRef.current?.focus()
              }
              className="
                flex-1
                overflow-y-auto
                px-6
                py-6
                lg:px-8
                lg:py-7
                cv-mono
                text-xs
                lg:text-sm
                leading-relaxed
                cursor-text
              "
            >
              <div className="text-neutral-400 dark:text-neutral-500 mb-6">
                <p>
                  Justin Sillou terminal
                </p>

                <p>
                  Type{" "}
                  <span className="text-neutral-900 dark:text-neutral-100">
                    help
                  </span>{" "}
                  to get started.
                </p>
              </div>

              <div className="space-y-4">
                {history.map((entry) => (
                  <TerminalOutput
                    key={entry.id}
                    type={entry.type}
                  >
                    {entry.content}
                  </TerminalOutput>
                ))}
              </div>

              {/* Prompt */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center mt-6"
              >
                <span className="shrink-0 text-neutral-900 dark:text-neutral-100">
                  $
                </span>

                <div className="relative flex-1 ml-2">
                  <input
                    ref={inputRef}
                    value={command}
                    onChange={(event) =>
                      setCommand(
                        event.target.value,
                      )
                    }
                    onKeyDown={
                      handleInputKeyDown
                    }
                    type="text"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    className="
                      w-full
                      bg-transparent
                      border-none
                      outline-none
                      text-neutral-900
                      dark:text-neutral-100
                      caret-transparent
                    "
                    aria-label="Commande terminal"
                  />

                  <span
                    className="
                      pointer-events-none
                      absolute
                      left-0
                      top-0
                      h-[1.25em]
                      w-[7px]
                      bg-neutral-900
                      dark:bg-neutral-100
                      animate-pulse
                    "
                    style={{
                      transform: `translateX(${command.length * 0.6}em)`,
                    }}
                  />
                </div>
              </form>
            </div>
          </section>
        </>
      )}
    </div>
  );
}