/**
 * Dictionnaires de traduction.
 *
 * Une seule source pour tout le texte d'interface du site. Les pages ne sont
 * pas dupliquées par langue : elles lisent leurs chaînes ici, via
 * `useTranslations(lang)` (voir `./utils.ts`).
 *
 * Convention de clé : `zone.element`, en anglais, minuscules.
 * Les valeurs peuvent contenir des marqueurs `{nom}`, remplacés à l'appel :
 *
 *   t("projects.count", { count: 7 })  ->  "7 projets"
 *
 * Le français fait référence : toute clé ajoutée à `fr` doit exister dans `en`,
 * le typage le vérifie à la compilation.
 */

export const languages = {
  fr: "Français",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "fr";

/** Code BCP 47, pour `<html lang>` et le formatage des dates. */
export const localeTags: Record<Lang, string> = {
  fr: "fr-FR",
  en: "en-GB",
};

/** Code Open Graph. */
export const ogLocales: Record<Lang, string> = {
  fr: "fr_FR",
  en: "en_GB",
};

const fr = {
  // Identité
  "site.name": "Justin Sillou",
  "site.description":
    "Justin Sillou — développeur back-end à Lille. Projets, notes et veille.",
  "site.rssTitle": "Justin Sillou — Blog",

  // Navigation
  "nav.home": "Accueil",
  "nav.now": "Now",
  "nav.projects": "Projets",
  "nav.blog": "Blog",
  "nav.cv": "CV",
  "nav.changelog": "Changelog",
  "nav.main": "Navigation principale",
  "nav.mainMobile": "Navigation principale (mobile)",
  "nav.homeAria": "Aller à l'accueil",
  "nav.homeTitle": "Accueil",
  "nav.openMenu": "Ouvrir le menu",
  "nav.closeMenu": "Fermer le menu",
  "nav.search": "Rechercher dans le site (Ctrl + K)",
  "nav.searchTitle": "Rechercher (Ctrl + K)",
  "nav.theme": "Changer de thème",
  "nav.backToTop": "Retourner en haut de la page",
  "nav.backToTopTitle": "Retourner en haut",
  "nav.languageTo": "Voir cette page en anglais",

  // Accueil
  "home.role": "DEV — Lille",
  "home.intro":
    "Principalement orienté back-end, avec du développement d'API, d'outils internes et un peu d'infrastructure. Mais l'intérêt va plus largement à tout ce qui touche au web, aussi bien au front-end qu'au back-end.",
  "home.introAside":
    "L'open source, l'auto-hébergement et la bidouille sont également sujets qui m'intéressent, avec toujours l'envie d'expérimenter, de monter des projets et de comprendre comment les choses fonctionnent.",
  "home.sections": "Sections du site",
  "home.hint.now": "ce que je fais en ce moment",
  "home.hint.projects": "perso et universitaires",
  "home.hint.blog": "notes et veille",
  "home.hint.cv": "parcours détaillé",
  "home.shortcut": "Ctrl + K pour chercher dans le site",

  // Pied de page
  "footer.lastUpdate": "Dernière mise à jour : {date} — v{version}",

  // Écoconception
  "eco.static": "Site statique, sans tracker ni publicité.",
  "eco.weight":
    "Cette page pèse {size} — environ {grams} g de CO₂e par visite.",
  "eco.measure": "Mesurer la note écologique de cette page ↗",
  "eco.noteLabel": "Ce que cette note ne mesure pas",
  "eco.note":
    "Cette note porte sur la page seule : son poids, ses requêtes, sa complexité. Elle ne dit rien de l'infrastructure qui l'héberge — datacenter, mix énergétique, fabrication et durée de vie des machines, qui pèsent souvent plus lourd que la page elle-même.",
  "eco.noteExtra": "À revoir le jour où ce site passera en auto-hébergement.",
  "eco.unitKb": "Ko",
  "eco.unitMb": "Mo",

  // Now
  "now.title": "Now",
  "now.where": "Où",
  "now.updated": "Mise à jour",
  "now.inspiredBefore": "Page inspirée du ",
  "now.inspiredLink": "/now movement",
  "now.inspiredAfter": " de Derek Sivers.",
  "now.freshness.today": "aujourd'hui",
  "now.freshness.yesterday": "hier",
  "now.freshness.days": "il y a {count} jours",
  "now.freshness.months": "il y a {count} mois",
  "now.freshness.years": "il y a {count} an(s)",

  // Projets
  "projects.title": "Projets",
  "projects.introBefore":
    "Projets personnels et universitaires. Le travail réalisé en entreprise est détaillé sur la ",
  "projects.introLink": "page CV",
  "projects.introAfter": ".",
  "projects.ongoing": "en cours",
  "projects.empty": "Aucun projet avec ce filtre.",
  "projects.filter": "Filtrer",
  "projects.filterAria": "Filtrer les projets",
  "projects.all": "tous",
  "projects.count": "{count} projets",
  "projects.countOne": "{count} projet",
  "projects.category.web": "web",
  "projects.category.mobile": "mobile",
  "projects.category.algorithms": "algorithmie",

  // Blog
  "blog.title": "Blog",
  "blog.intro":
    "Des notes sur ce que je lis, ce que je casse et ce que je répare. Peu d'articles, mais tenus à jour.",
  "blog.rss": "Suivre par RSS",
  "blog.none": "Pas encore d'article publié.",
  "blog.emptyFilter": "Aucun article sur ce thème.",
  "blog.themes": "Thèmes",
  "blog.filterAria": "Filtrer les articles par thème",
  "blog.all": "tous",
  "blog.tracked": "suivi",
  "blog.minutes": "{count} min",
  "blog.original": "en français",

  // Article
  "post.back": "← blog",
  "post.readingTime": "{count} min de lecture",
  "post.notTranslated":
    "Cet article n'existe pas encore dans cette langue : voici la version française.",
  "post.updatedOn": "Mis à jour le {date}",
  "post.toc": "Sommaire",
  "post.tocAria": "Sommaire",
  "post.sources": "Sources",
  "post.otherPosts": "Autres articles",
  "post.newer": "← plus récent",
  "post.older": "plus ancien →",
  "post.share": "partager",
  "post.shareCopied": "lien copié",
  "post.shareFailed": "copie impossible",
  "post.ai.none": "Écrit sans outil d'IA.",
  "post.ai.research":
    "Recherche documentaire assistée par IA, rédaction humaine.",
  "post.ai.editing": "Rédaction humaine, relecture assistée par IA.",
  "post.ai.drafting":
    "Première version rédigée avec une IA, reprise et vérifiée à la main.",

  // CV
  "cv.title": "CV",
  "cv.role": "Développeur Fullstack — Lille, Hauts-de-France",
  "cv.experience": "Expérience",
  "cv.education": "Formation",
  "cv.diploma": "Voir le diplôme →",
  "cv.stack": "Stack",
  "cv.softSkills": "Compétences transversales",
  "cv.languages": "Langues",
  "cv.interests": "Centres d'intérêt",
  "cv.additional": "Informations complémentaires",
  "cv.product": "Produit",

  // Changelog
  "changelog.title": "Changelog",
  "changelog.roadmap": "À venir",
  "changelog.roadmapNote":
    "Sans date : une ligne disparaît d'ici quand elle arrive dans le journal.",

  // 404
  "notfound.title": "Cette page n'existe pas",
  "notfound.text": "Le lien est peut-être obsolète — le site a été refondu.",
  "notfound.pages": "Pages du site",
  "notfound.pageTitle": "Page introuvable",

  // Raccourcis
  "widget.seeAll": "tout voir",
  "widget.highlights": "À la une",
  "widget.leaks.title": "Dernières fuites recensées",
  "widget.leaks.meta": "relevé le {date}",
  "widget.leaks.metaStale": "flux injoignable — données arrêtées au {date}",
  "widget.leaks.link": "l'article",
  "widget.leaks.claimed": "revendiqué",
  "widget.leaks.claimedTitle":
    "Fuite revendiquée, pas encore confirmée par l'organisme",
  "widget.leaks.sensitive": "sensible",
  "widget.leaks.sensitiveTitle":
    "Données sensibles au sens de l'article 9 du RGPD",
  "widget.leaks.sourceBefore": "Source : ",
  "widget.leaks.sourceAfter":
    ", projet libre sous licence MIT. Flux lu à la génération du site : aucune requête depuis votre navigateur.",

  // Terminal / palette de commandes
  "terminal.open": "Ouvrir le terminal (Ctrl + K)",
  "terminal.dialog": "Recherche et navigation",
  "terminal.input": "Recherche",
  "terminal.placeholder": "page, article, commande…",
  "terminal.noResults": "aucun résultat",
  "terminal.noResultsFor": "Aucun résultat pour : {query}",
  "terminal.group.pages": "Pages",
  "terminal.group.posts": "Articles",
  "terminal.group.actions": "Actions",
  "terminal.cmd.home": "accueil",
  "terminal.cmd.theme": "basculer clair / sombre",
  "terminal.cmd.about": "en une ligne",
  "terminal.cmd.language": "passer en anglais",
  "terminal.themeDark": "Thème sombre.",
  "terminal.themeLight": "Thème clair.",
  "terminal.about":
    "Justin Sillou — développeur back-end à Lille. PHP, TypeScript, un peu de tout le reste.",
  "terminal.mirrorOn": "ǝɹıoɹıɯ uǝ ǝʇıS — retapez nitsuj pour revenir.",
  "terminal.mirrorOff": "Retour à l'endroit.",
} as const;

export type UIKey = keyof typeof fr;

const en: Record<UIKey, string> = {
  // Identity
  "site.name": "Justin Sillou",
  "site.description":
    "Justin Sillou — back-end developer based in Lille, France. Projects, notes and tech watch.",
  "site.rssTitle": "Justin Sillou — Blog",

  // Navigation
  "nav.home": "Home",
  "nav.now": "Now",
  "nav.projects": "Projects",
  "nav.blog": "Blog",
  "nav.cv": "Résumé",
  "nav.changelog": "Changelog",
  "nav.main": "Main navigation",
  "nav.mainMobile": "Main navigation (mobile)",
  "nav.homeAria": "Go to homepage",
  "nav.homeTitle": "Home",
  "nav.openMenu": "Open menu",
  "nav.closeMenu": "Close menu",
  "nav.search": "Search the site (Ctrl + K)",
  "nav.searchTitle": "Search (Ctrl + K)",
  "nav.theme": "Switch theme",
  "nav.backToTop": "Back to top of page",
  "nav.backToTopTitle": "Back to top",
  "nav.languageTo": "View this page in French",

  // Home
  "home.role": "DEV — Lille, France",
  "home.intro":
    "Mostly back-end work: APIs, internal tools and a bit of infrastructure. But my interest goes wider than that — pretty much anything web, front-end as well as back-end.",
  "home.introAside":
    "Open source, self-hosting and tinkering are things I care about too, always with the urge to experiment, start projects and understand how things actually work.",
  "home.sections": "Site sections",
  "home.hint.now": "what I am up to right now",
  "home.hint.projects": "personal and university work",
  "home.hint.blog": "notes and tech watch",
  "home.hint.cv": "full background",
  "home.shortcut": "Ctrl + K to search the site",

  // Footer
  "footer.lastUpdate": "Last updated: {date} — v{version}",

  // Eco design
  "eco.static": "Static site, no tracker and no ads.",
  "eco.weight": "This page weighs {size} — about {grams} g CO₂e per visit.",
  "eco.measure": "Measure this page's environmental score ↗",
  "eco.noteLabel": "What this score does not measure",
  "eco.note":
    "This score only covers the page itself: its weight, its requests, its complexity. It says nothing about the infrastructure hosting it — datacenter, energy mix, manufacturing and lifespan of the machines, which often weigh more than the page does.",
  "eco.noteExtra": "To be revisited the day this site moves to self-hosting.",
  "eco.unitKb": "kB",
  "eco.unitMb": "MB",

  // Now
  "now.title": "Now",
  "now.where": "Where",
  "now.updated": "Updated",
  "now.inspiredBefore": "Page inspired by Derek Sivers' ",
  "now.inspiredLink": "/now movement",
  "now.inspiredAfter": ".",
  "now.freshness.today": "today",
  "now.freshness.yesterday": "yesterday",
  "now.freshness.days": "{count} days ago",
  "now.freshness.months": "{count} months ago",
  "now.freshness.years": "{count} year(s) ago",

  // Projects
  "projects.title": "Projects",
  "projects.introBefore":
    "Personal and university projects. Work done in a professional setting is detailed on the ",
  "projects.introLink": "résumé page",
  "projects.introAfter": ".",
  "projects.ongoing": "ongoing",
  "projects.empty": "No project matches this filter.",
  "projects.filter": "Filter",
  "projects.filterAria": "Filter projects",
  "projects.all": "all",
  "projects.count": "{count} projects",
  "projects.countOne": "{count} project",
  "projects.category.web": "web",
  "projects.category.mobile": "mobile",
  "projects.category.algorithms": "algorithms",

  // Blog
  "blog.title": "Blog",
  "blog.intro":
    "Notes on what I read, what I break and what I fix. Few posts, but kept up to date.",
  "blog.rss": "Follow via RSS",
  "blog.none": "No post published yet.",
  "blog.emptyFilter": "No post on this topic.",
  "blog.themes": "Topics",
  "blog.filterAria": "Filter posts by topic",
  "blog.all": "all",
  "blog.tracked": "tracked",
  "blog.minutes": "{count} min",
  "blog.original": "in French",

  // Post
  "post.back": "← blog",
  "post.readingTime": "{count} min read",
  "post.notTranslated":
    "This post has not been translated yet: here is the French version.",
  "post.updatedOn": "Updated on {date}",
  "post.toc": "Contents",
  "post.tocAria": "Table of contents",
  "post.sources": "Sources",
  "post.otherPosts": "Other posts",
  "post.newer": "← newer",
  "post.older": "older →",
  "post.share": "share",
  "post.shareCopied": "link copied",
  "post.shareFailed": "copy failed",
  "post.ai.none": "Written without any AI tool.",
  "post.ai.research": "AI-assisted background research, written by a human.",
  "post.ai.editing": "Written by a human, AI-assisted proofreading.",
  "post.ai.drafting":
    "First draft written with an AI, then reworked and fact-checked by hand.",

  // Résumé
  "cv.title": "Résumé",
  "cv.role": "Fullstack developer — Lille, Hauts-de-France, France",
  "cv.experience": "Experience",
  "cv.education": "Education",
  "cv.diploma": "View diploma →",
  "cv.stack": "Stack",
  "cv.softSkills": "Soft skills",
  "cv.languages": "Languages",
  "cv.interests": "Interests",
  "cv.additional": "Additional information",
  "cv.product": "Product",

  // Changelog
  "changelog.title": "Changelog",
  "changelog.roadmap": "Coming up",
  "changelog.roadmapNote":
    "No dates: a line leaves this list when it lands in the log.",

  // 404
  "notfound.title": "This page does not exist",
  "notfound.text": "The link may be outdated — the site was rebuilt.",
  "notfound.pages": "Site pages",
  "notfound.pageTitle": "Page not found",

  // Widgets
  "widget.seeAll": "see all",
  "widget.highlights": "Featured",
  "widget.leaks.title": "Latest recorded leaks",
  "widget.leaks.meta": "recorded on {date}",
  "widget.leaks.metaStale": "feed unreachable — data as of {date}",
  "widget.leaks.link": "the post",
  "widget.leaks.claimed": "claimed",
  "widget.leaks.claimedTitle":
    "Leak claimed by attackers, not yet confirmed by the organisation",
  "widget.leaks.sensitive": "sensitive",
  "widget.leaks.sensitiveTitle":
    "Sensitive data as defined by article 9 of the GDPR",
  "widget.leaks.sourceBefore": "Source: ",
  "widget.leaks.sourceAfter":
    ", a free software project under the MIT licence. The feed is read when the site is built: no request from your browser.",

  // Terminal / command palette
  "terminal.open": "Open the terminal (Ctrl + K)",
  "terminal.dialog": "Search and navigation",
  "terminal.input": "Search",
  "terminal.placeholder": "page, post, command…",
  "terminal.noResults": "no result",
  "terminal.noResultsFor": "No result for: {query}",
  "terminal.group.pages": "Pages",
  "terminal.group.posts": "Posts",
  "terminal.group.actions": "Actions",
  "terminal.cmd.home": "home",
  "terminal.cmd.theme": "toggle light / dark",
  "terminal.cmd.about": "in one line",
  "terminal.cmd.language": "switch to French",
  "terminal.themeDark": "Dark theme.",
  "terminal.themeLight": "Light theme.",
  "terminal.about":
    "Justin Sillou — back-end developer in Lille, France. PHP, TypeScript, a bit of everything else.",
  "terminal.mirrorOn": "ǝpoɯ ɹoɹɹıW — type nitsuj again to go back.",
  "terminal.mirrorOff": "Back the right way up.",
};

export const ui: Record<Lang, Record<UIKey, string>> = { fr, en };

/**
 * Clin d'œil, volontairement non traduit : la réplique existe en anglais.
 * Doctor Who, « The Big Bang » (2010).
 */
export const STORIES_QUOTE =
  "\"We're all stories in the end. Just make it a good one.\" - 11th Doctor";

/**
 * Chaînes embarquées dans la palette de commandes.
 *
 * La palette est une île React : ses textes voyagent dans le HTML de chaque
 * page. On n'envoie donc que ce qu'elle utilise, pas le dictionnaire entier.
 */
export const TERMINAL_KEYS = [
  "nav.projects",
  "terminal.open",
  "terminal.dialog",
  "terminal.input",
  "terminal.placeholder",
  "terminal.noResults",
  "terminal.noResultsFor",
  "terminal.group.pages",
  "terminal.group.posts",
  "terminal.group.actions",
  "terminal.cmd.home",
  "terminal.cmd.theme",
  "terminal.cmd.about",
  "terminal.cmd.language",
  "terminal.themeDark",
  "terminal.themeLight",
  "terminal.about",
  "terminal.mirrorOn",
  "terminal.mirrorOff",
] as const satisfies readonly UIKey[];

export type TerminalKey = (typeof TERMINAL_KEYS)[number];
