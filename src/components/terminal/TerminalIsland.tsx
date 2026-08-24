import { useEffect, useMemo, useRef, useState } from "react";

import { normalize } from "./normalize";
import type { TerminalKey } from "../../i18n/ui";

/**
 * Terminal minimal.
 *
 * Une seule ligne de commande, une liste filtrée, rien d'autre :
 * pas de fausse fenêtre macOS, pas d'historique à faire défiler.
 * Ouverture au clic sur le `$`, ou avec Ctrl/⌘ + K.
 *
 * La liste couvre les pages du site et les articles du blog, ce qui en fait
 * aussi la recherche du site. Les articles sont fournis par BaseLayout.
 *
 * Cette île est rendue côté client : elle ne peut pas lire les dictionnaires
 * au moment du rendu. BaseLayout lui passe donc les chaînes de la langue
 * courante (`strings`) et les chemins déjà préfixés (`paths`).
 */

export type PostEntry = {
  title: string;
  href: string;
  tags: string[];
  date: string;
};

export type TerminalPaths = {
  home: string;
  now: string;
  projects: string;
  blog: string;
  cv: string;
  changelog: string;
  /** La page courante dans l'autre langue. */
  otherLang: string;
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

export default function TerminalIsland({
  posts = [],
  strings,
  paths,
}: {
  posts?: PostEntry[];
  strings: Record<TerminalKey, string>;
  paths: TerminalPaths;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const t = useMemo(
    () =>
      (key: TerminalKey, params?: Record<string, string>) => {
        const raw = strings[key] ?? key;

        if (!params) return raw;

        return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
          name in params ? params[name] : match,
        );
      },
    [strings],
  );

  const groupLabels: Record<Group, string> = useMemo(
    () => ({
      pages: t("terminal.group.pages"),
      articles: t("terminal.group.posts"),
      actions: t("terminal.group.actions"),
    }),
    [t],
  );

  const commands = useMemo<Command[]>(
    () => [
      {
        name: t("terminal.cmd.home"),
        hint: paths.home,
        group: "pages",
        keywords: "accueil home /",
        run: goTo(paths.home),
      },
      { name: "now", hint: paths.now, group: "pages", run: goTo(paths.now) },
      {
        name: t("nav.projects").toLowerCase(),
        hint: paths.projects,
        group: "pages",
        keywords: "projets projects",
        run: goTo(paths.projects),
      },
      { name: "blog", hint: paths.blog, group: "pages", run: goTo(paths.blog) },
      {
        name: "cv",
        hint: paths.cv,
        group: "pages",
        keywords: "resume résumé",
        run: goTo(paths.cv),
      },
      {
        name: "changelog",
        hint: paths.changelog,
        group: "pages",
        run: goTo(paths.changelog),
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
        name: "lang",
        hint: t("terminal.cmd.language"),
        group: "actions",
        keywords: "langue language français english fr en",
        run: goTo(paths.otherLang),
      },
      {
        name: "theme",
        hint: t("terminal.cmd.theme"),
        group: "actions",
        run: () => {
          const isDark = document.documentElement.classList.toggle("dark");
          localStorage.setItem("theme", isDark ? "dark" : "light");
          return isDark ? t("terminal.themeDark") : t("terminal.themeLight");
        },
      },
      {
        name: "about",
        hint: t("terminal.cmd.about"),
        group: "actions",
        run: () => t("terminal.about"),
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

          return miroir ? t("terminal.mirrorOn") : t("terminal.mirrorOff");
        },
      },
    ],
    [posts, paths, t],
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
      setMessage(t("terminal.noResultsFor", { query: value.trim() }));
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
          aria-label={t("terminal.open")}
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
            aria-label={t("terminal.dialog")}
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
                placeholder={t("terminal.placeholder")}
                aria-label={t("terminal.input")}
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
                  {t("terminal.noResults")}
                </li>
              )}

              {matches.map((command, index) => (
                <li key={`${command.group}-${command.name}`}>
                  {/* En-tête affiché au premier élément de chaque groupe. */}
                  {matches[index - 1]?.group !== command.group && (
                    <p className="cv-mono px-4 pb-1 pt-3 text-[10px] uppercase text-neutral-300 dark:text-neutral-700">
                      {groupLabels[command.group]}
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
