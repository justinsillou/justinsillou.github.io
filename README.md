# justinsillou.github.io

Site personnel — Astro + Tailwind, statique, bilingue (français / anglais),
déployé sur GitHub Pages.

## Commandes

| Commande          | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installe les dépendances                     |
| `npm run dev`     | Serveur local sur `localhost:4321`           |
| `npm run build`   | Build de production dans `./dist/`           |
| `npm run preview` | Prévisualise le build avant déploiement      |
| `npm run check`   | Vérifie le typage (`astro check`)            |

`astro build` transpile sans vérifier les types : c'est `npm run check` qui
les valide. Le workflow GitHub Actions l'exécute avant le build, donc une
erreur de typage bloque le déploiement.

Si l'île React (la palette `Ctrl + K`) disparaît en développement avec un
`_jsxDEV is not a function` en console, c'est le cache de pré-bundling de Vite
qui a divergé — typiquement après un `astro check` lancé pendant que le serveur
tournait. `rm -rf node_modules/.vite .astro` puis relancer.

## Structure

```text
src/
├── content/
│   └── blog/
│       ├── fr/               # Articles en français
│       └── en/               # Traductions (facultatives)
├── content.config.ts         # Schéma du blog (frontmatter)
├── i18n/
│   ├── ui.ts                 # Dictionnaires fr / en
│   └── utils.ts              # t(), chemins localisés, dates
├── lib/
│   ├── blog.ts               # Lecture du blog, langue par langue
│   └── xml.ts                # Échappement XML (flux RSS)
├── data/
│   ├── changelog.ts          # Historique des versions (affiché dans le footer)
│   ├── cv.ts                 # Expériences, formation, compétences
│   ├── highlights.ts         # Raccourci « à la une »
│   ├── leaks.ts              # Flux externe des fuites de données
│   ├── now.ts                # Contenu de la page /now
│   ├── projects.ts           # Projets perso et universitaires
│   └── roadmap.ts            # « À venir », en regard du changelog
├── components/
│   ├── terminal/             # Palette de commandes (Ctrl + K)
│   └── widgets/              # Raccourcis réutilisables
├── layouts/
├── pages/
│   ├── [...locale]/          # Toutes les pages, un gabarit pour deux langues
│   └── 404.astro             # Hors routage : GitHub Pages n'en sert qu'une
└── styles/
```

Le contenu vit dans `src/data/`, `src/content/` et `src/i18n/`. Les pages ne
font que l'afficher : pour mettre le site à jour, il suffit en général
d'éditer un fichier de données.

## Traductions

Le site existe en français (à la racine) et en anglais (préfixe `/en`). Il n'y
a **pas** de page dupliquée par langue : chaque page est un seul fichier sous
`src/pages/[...locale]/`, qui déclare

```astro
export const getStaticPaths = () => localePaths();
```

et lit ses textes dans les dictionnaires :

```astro
const { lang } = Astro.props as { lang: Lang };
const t = useTranslations(lang);
```

- **Ajouter une chaîne** : l'ajouter à `fr` dans `src/i18n/ui.ts`. Le typage
  impose alors la même clé dans `en` — un oubli fait échouer `npm run check`.
- **Faire un lien interne** : toujours `localizePath(lang, "/projets")`, jamais
  un `href` en dur. La fonction ajoute le préfixe de langue *et* le préfixe de
  déploiement (`--base`).
- **Lire l'URL courante** : `getLangFromUrl(Astro.url)` pour la langue,
  `stripLang(pathname)` pour le chemin canonique.
- **Formater une date** : `formatDate(date, lang)`, jamais
  `toLocaleDateString` en dur.

Les composants partagés (en-tête, pied de page, raccourcis) déduisent la langue
de l'URL, il n'y a rien à leur passer.

Les scripts côté client ne connaissent pas la langue : leurs libellés leur
arrivent en attributs `data-…` (menu, filtres, fraîcheur de /now, poids éco,
bouton de partage). La palette `Ctrl + K` est une île React, elle reçoit en
props le sous-ensemble de chaînes dont elle a besoin — `TERMINAL_KEYS` dans
`ui.ts` — plutôt que le dictionnaire entier.

## Ajouter un article

Créer un fichier dans `src/content/blog/fr/`. Le nom du fichier devient l'URL :
`mon-article.md` → `/blog/mon-article`.

```markdown
---
title: "Titre de l'article"
description: "Une phrase, affichée dans la liste et dans les métadonnées."
pubDate: 2026-08-21
updatedDate: 2026-09-01   # optionnel
tags: ["Sécurité", "Veille"]
draft: false              # true = non publié
evergreen: false          # true = article suivi, mis à jour dans le temps
sources:                  # optionnel
  - label: "CNIL"
    href: "https://www.cnil.fr/"
---

Le corps de l'article, en Markdown. Les `##` alimentent le sommaire.
```

Pour le traduire, créer `src/content/blog/en/mon-article.md` — **même nom de
fichier** : c'est l'identifiant commun aux traductions, ce qui garde l'URL
stable et permet au sélecteur de langue de rester sur le même article. Les
`tags` se traduisent aussi, ils alimentent les filtres.

Sans traduction, l'article reste visible en anglais dans sa version française,
avec la mention correspondante. Rien ne disparaît.

Le schéma est validé au build (`src/content.config.ts`) : un frontmatter
incomplet fait échouer le build plutôt que de publier une page cassée. C'est
ce qui permet d'alimenter le blog par script sans risque.

## Raccourcis (widgets)

Blocs réutilisables, posables sur n'importe quelle page :

```astro
---
import WidgetGrid from "../components/widgets/WidgetGrid.astro";
import LeaksWidget from "../components/widgets/LeaksWidget.astro";
---

<WidgetGrid columns={2}>
  <LeaksWidget limit={4} compact hideNote />
  <!-- d'autres raccourcis ici -->
</WidgetGrid>
```

- `Widget.astro` — la coquille : titre, méta, lien « tout voir », slot de
  contenu et slot `note`. Écrire un nouveau raccourci revient à remplir ce
  cadre, sans refaire la mise en forme.
- `WidgetGrid.astro` — dispose plusieurs raccourcis en 1, 2 ou 3 colonnes.
- `LeaksWidget.astro` — les dernières fuites recensées (voir ci-dessous).
- `HighlightsWidget.astro` — « à la une », sélection manuelle éditée dans
  `src/data/highlights.ts`. Un tableau vide masque le raccourci.

L'accueil s'en sert dans sa colonne de droite. Pour la basculer à gauche,
inverser les deux valeurs de `lg:grid-cols-[minmax(0,1fr)_340px]` dans
`src/pages/[...locale]/index.astro` et ajouter `lg:order-first` sur le
`<aside>`.

## Recherche

`Ctrl + K` (ou le `$` en bas à gauche, ou la loupe de l'en-tête) ouvre la
palette : pages, articles du blog et actions dans une seule liste. Les articles
sont injectés par `BaseLayout.astro`, dans la langue de la page ; la recherche
ignore les accents et couvre aussi les tags, donc `rgpd` ou `donnees` trouvent
le bon article. La commande `lang` bascule sur la même page dans l'autre
langue.

## Blog — ce que la page d'article fournit

- **Flux RSS**, un par langue : `/rss.xml` et `/en/rss.xml`, générés par
  `src/pages/[...locale]/rss.xml.ts` et déclarés dans le `<head>`.
- **Sommaire actif** : la section en cours est surlignée pendant le scroll.
- **Barre de progression** en CSS pur (`animation-timeline: scroll()`), donc
  sans écouteur d'événement. Invisible si le navigateur ne gère pas cette
  propriété, masquée si l'utilisateur limite les animations.
- **Article précédent / suivant**, calculés dans `getStaticPaths`.
- **Bouton de partage** : partage natif du navigateur si disponible, copie du
  lien sinon. Aucun service tiers, aucune requête réseau.
- **Transparence IA** : champ `ai` du frontmatter, au choix `none`,
  `research`, `editing` ou `drafting`. Non renseigné, rien ne s'affiche.

Le plan du site est produit par `@astrojs/sitemap` (`sitemap-index.xml`), avec
les alternances de langue, et `public/robots.txt` le référence.

## Données externes

Le bloc « dernières fuites recensées » de l'article sur les fuites de données est
alimenté par le flux RSS public de [bonjourlafuite.eu.org](https://bonjourlafuite.eu.org/)
(projet libre sous licence MIT).

Le flux est lu **au build**, dans [`src/data/leaks.ts`](src/data/leaks.ts) :
aucun JavaScript n'est envoyé au visiteur et aucune requête tierce n'est faite
depuis son navigateur. C'est une source tierce, donc traitée comme telle : la
réponse est plafonnée à 1 Mo, le nombre d'entrées et la longueur des champs
aussi.

Si le flux est injoignable, le build retombe sur `src/data/leaks-snapshot.json`
plutôt que d'échouer — et le raccourci l'affiche : il annonce alors la date de
la dernière fuite connue, pas celle du build.

Les données ne se rafraîchissent donc qu'au déploiement : le workflow GitHub
Actions tourne une fois par jour pour ça (`schedule` dans
`.github/workflows/astro.yml`), à `17 4 * * *` — soit 6 h 17 à Paris en heure
d'été, 5 h 17 en hiver. La minute n'est pas ronde exprès : les crons GitHub
partent d'une file partagée et les heures pile y sont les plus encombrées.

Pour afficher ce bloc sous un article, ajouter `widget: leaks` à son frontmatter.

## Couleurs des compétences (CV)

Chaque techno du CV reçoit une teinte, répartie sur le cercle chromatique dans
l'ordre alphabétique — donc identique d'un build à l'autre et entre les deux
langues. Seule la teinte est décidée côté page (`--skill-hue`) : la saturation
et la luminosité viennent du thème (`.cv-skill` dans `global.css`), parce
qu'une même teinte ne peut pas être lisible à la fois sur blanc et sur presque
noir. Les valeurs retenues gardent la pire teinte au-dessus du seuil WCAG AA
(4,5:1) dans les deux thèmes.

## Mettre à jour la page /now

Éditer `src/data/now.ts`, et surtout `nowUpdatedAt` — l'indicateur de
fraîcheur affiché sur la page en dépend. Les deux langues sont dans le même
fichier.

## Changelog et « À venir »

La page `/changelog` tient sur deux colonnes : le journal des versions à
gauche, la feuille de route à droite — collante, donc visible pendant tout le
défilement. En dessous de `lg`, la feuille de route passe au-dessus du journal.

**Le journal** — ajouter une entrée en tête de `src/data/changelog.ts`, avec une
`date` au format ISO et les textes dans les deux langues. La plus récente est
affichée dans le pied de page de toutes les pages.

Une ligne = un changement, énoncé une seule fois : ne pas reprendre le titre de
la version dans les lignes, ni décrire la même fonctionnalité sous deux angles.

**La feuille de route** — `src/data/roadmap.ts`. Pas de date, pas de case à
cocher : quand une idée est livrée, on la retire de ce fichier et on l'écrit
dans le changelog. Une ligne qui disparaît d'un côté réapparaît de l'autre,
donc aucun état à tenir à jour en double.

`soon: true` marque le prochain lot ; une idée sans ce drapeau s'affiche en
retrait plutôt que de disparaître. Une liste vide masque toute la colonne.
