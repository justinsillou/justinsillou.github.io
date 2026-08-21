import { useEffect, useMemo, useRef, useState } from "react";

import { normalize } from "./normalize";

/**
 * Terminal minimal.
 *
 * Une seule ligne de commande, une liste filtrée, rien d'autre :
 * pas de fausse fenêtre macOS, pas d'historique à faire défiler.
 * Ouverture au clic sur le `$`, ou avec Ctrl/⌘ + K.
 *
 * La liste couvre les pages du site et les articles du blog, ce qui en fait
 * aussi la recherche du site. Les articles sont fournis par BaseLayout.
 */

export type PostEntry = {
  title: string;
  href: string;
  tags: string[];
  date: string;
};

type Group = "pages" | "articles" | "actions";

type Command = {
  name: string;
  hint: string;
  group: Group;
  /** Mots supplémentaires pris en compte par la recherche. */
  keywords?: string;
  /** Absente de la liste tant qu'on ne tape pas son nom. */
  hidden?: boolean;
  /** Renvoie un texte à afficher, ou rien si l'action suffit. */
  run: () => string | void;
};

const goTo = (href: string) => () => {
  window.location.href = href;
};

const GROUP_LABELS: Record<Group, string> = {
  pages: "Pages",
  articles: "Articles",
  actions: "Actions",
};

export default function TerminalIsland({
  posts = [],
}: {
  posts?: PostEntry[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(
    () => [
      { name: "accueil", hint: "/", group: "pages", run: goTo("/") },
      { name: "now", hint: "/now", group: "pages", run: goTo("/now") },
      {
        name: "projets",
        hint: "/projets",
        group: "pages",
        run: goTo("/projets"),
      },
      { name: "blog", hint: "/blog", group: "pages", run: goTo("/blog") },
      { name: "cv", hint: "/cv", group: "pages", run: goTo("/cv") },
      {
        name: "changelog",
        hint: "/changelog",
        group: "pages",
        run: goTo("/changelog"),
      },

      ...posts.map<Command>((post) => ({
        name: post.title,
        hint: post.date,
        group: "articles",
        keywords: post.tags.join(" "),
        run: goTo(post.href),
      })),

      {
        name: "github",
        hint: "github.com/justinsillou",
        group: "actions",
        run: goTo("https://github.com/justinsillou"),
      },
      {
        name: "linkedin",
        hint: "linkedin.com/in/justinsillou",
        group: "actions",
        run: goTo("https://www.linkedin.com/in/justinsillou/"),
      },
      {
        name: "theme",
        hint: "basculer clair / sombre",
        group: "actions",
        run: () => {
          const isDark = document.documentElement.classList.toggle("dark");
          localStorage.setItem("theme", isDark ? "dark" : "light");
          return isDark ? "Thème sombre." : "Thème clair.";
        },
      },
      {
        name: "about",
        hint: "en une ligne",
        group: "actions",
        run: () =>
          "Justin Sillou — développeur back-end à Lille. PHP, TypeScript, un peu de tout le reste.",
      },
      {
        name: "nitsuj",
        hint: "?",
        group: "actions",
        hidden: true,
        run: () => {
          const root = document.documentElement;
          const miroir = root.classList.toggle("miroir");

          localStorage.setItem("miroir", miroir ? "1" : "0");

          return miroir
            ? "ǝɹıoɹıɯ uǝ ǝʇıS — retapez nitsuj pour revenir."
            : "Retour à l'endroit.";
        },
      },
    ],
    [posts],
  );

  const matches = useMemo(() => {
    const query = normalize(value.trim());

    // Les commandes cachées ne sortent que si on tape leur nom.
    if (!query) return commands.filter((command) => !command.hidden);

    return commands.filter((command) =>
      command.hidden
        ? normalize(command.name).startsWith(query)
        : normalize(
            `${command.name} ${command.hint} ${command.keywords ?? ""}`,
          ).includes(query),
    );
  }, [commands, value]);

  const close = () => {
    setIsOpen(false);
    setValue("");
    setSelected(0);
    setMessage(null);
  };

  const execute = (command: Command | undefined) => {
    if (!command) {
      setMessage(`Aucun résultat pour : ${value.trim()}`);
      return;
    }

    const output = command.run();

    setValue("");
    setSelected(0);

    if (typeof output === "string") setMessage(output);
    else setMessage(null);
  };

  // Ouverture / fermeture au clavier, disponible partout sur le site.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setIsOpen((open) => !open);
        return;
      }

      if (event.key === "Escape") close();
    };

    const onOpenRequest = () => setIsOpen(true);

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("open-search", onOpenRequest);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("open-search", onOpenRequest);
    };
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    setSelected(0);
  }, [value]);

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((index) => Math.min(index + 1, matches.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected((index) => Math.max(index - 1, 0));
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const match = matches[selected];
      if (match) setValue(match.name);
    }
  };

  return (
    <div>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Ouvrir le terminal (Ctrl + K)"
          title="Ctrl + K"
          className="cv-mono fixed bottom-5 left-5 z-40 hidden h-8 w-8 select-none items-center justify-center text-sm text-neutral-300 transition-colors hover:text-neutral-600 md:flex dark:text-neutral-700 dark:hover:text-neutral-400"
        >
          $
        </button>
      )}

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-white/60 backdrop-blur-[2px] dark:bg-black/50"
            onClick={close}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Recherche et navigation"
            className="fixed left-1/2 top-[18vh] z-50 w-[min(36rem,calc(100vw-3rem))] -translate-x-1/2 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-950"
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
                execute(matches[selected]);
              }}
              className="flex items-center gap-2 px-4 py-3"
            >
              <span className="cv-mono text-sm text-neutral-400 dark:text-neutral-600">
                $
              </span>

              <input
                ref={inputRef}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={onInputKeyDown}
                type="text"
                autoComplete="off"
                spellCheck={false}
                placeholder="page, article, commande…"
                aria-label="Recherche"
                className="cv-mono w-full border-none bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-300 dark:text-neutral-100 dark:placeholder:text-neutral-700"
              />

              <kbd className="cv-mono shrink-0 text-[10px] text-neutral-300 dark:text-neutral-700">
                esc
              </kbd>
            </form>

            {message && (
              <p className="cv-mono border-t border-neutral-100 px-4 py-3 text-xs leading-relaxed text-neutral-500 dark:border-neutral-900 dark:text-neutral-400">
                {message}
              </p>
            )}

            <ul className="max-h-[22rem] overflow-y-auto border-t border-neutral-100 py-1 dark:border-neutral-900">
              {matches.length === 0 && (
                <li className="cv-mono px-4 py-3 text-xs text-neutral-400 dark:text-neutral-600">
                  aucun résultat
                </li>
              )}

              {matches.map((command, index) => (
                <li key={`${command.group}-${command.name}`}>
                  {/* En-tête affiché au premier élément de chaque groupe. */}
                  {matches[index - 1]?.group !== command.group && (
                    <p className="cv-mono px-4 pb-1 pt-3 text-[10px] uppercase text-neutral-300 dark:text-neutral-700">
                      {GROUP_LABELS[command.group]}
                    </p>
                  )}

                  <button
                    type="button"
                    onMouseEnter={() => setSelected(index)}
                    onClick={() => execute(command)}
                    className={`cv-mono flex w-full items-baseline justify-between gap-4 px-4 py-2 text-left text-xs transition-colors ${
                      index === selected
                        ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
                        : "text-neutral-500 dark:text-neutral-400"
                    }`}
                  >
                    <span className="min-w-0 truncate">{command.name}</span>

                    <span className="shrink-0 text-neutral-300 dark:text-neutral-700">
                      {command.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
