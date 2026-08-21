# justinsillou.github.io

Site personnel — Astro + Tailwind, statique, déployé sur GitHub Pages.

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

## Structure

```text
src/
├── content/
│   └── blog/              # Articles (Markdown) — une page par fichier
├── content.config.ts      # Schéma du blog (frontmatter)
├── data/
│   ├── changelog.ts       # Historique des versions (affiché dans le footer)
│   ├── cv.ts              # Expériences, formation, compétences
│   ├── now.ts             # Contenu de la page /now
│   └── projects.ts        # Projets perso et universitaires
├── components/
│   └── terminal/          # Palette de commandes (Ctrl + K)
├── layouts/
├── pages/
└── styles/
```

Le contenu vit dans `src/data/` et `src/content/`. Les pages ne font que
l'afficher : pour mettre le site à jour, il suffit en général d'éditer un
fichier de données.

## Ajouter un article

Créer un fichier dans `src/content/blog/`. Le nom du fichier devient l'URL :
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
`src/pages/index.astro` et ajouter `lg:order-first` sur le `<aside>`.

## Recherche

`Ctrl + K` (ou le `$` en bas à gauche) ouvre la palette : pages, articles du
blog et actions dans une seule liste. Les articles sont injectés par
`BaseLayout.astro` ; la recherche ignore les accents et couvre aussi les tags,
donc `rgpd` ou `donnees` trouvent le bon article.

## Blog — ce que la page d'article fournit

- **Flux RSS** sur `/rss.xml`, généré par `src/pages/rss.xml.ts`, déclaré dans
  le `<head>` de toutes les pages.
- **Sommaire actif** : la section en cours est surlignée pendant le scroll.
- **Barre de progression** en CSS pur (`animation-timeline: scroll()`), donc
  sans écouteur d'événement. Invisible si le navigateur ne gère pas cette
  propriété, masquée si l'utilisateur limite les animations.
- **Article précédent / suivant**, calculés dans `getStaticPaths`.
- **Bouton de partage** : partage natif du navigateur si disponible, copie du
  lien sinon. Aucun service tiers, aucune requête réseau.
- **Transparence IA** : champ `ai` du frontmatter, au choix `none`,
  `research`, `editing` ou `drafting`. Non renseigné, rien ne s'affiche.

Le plan du site est produit par `@astrojs/sitemap` (`sitemap-index.xml`), et
`public/robots.txt` le référence.

## Données externes

Le bloc « dernières fuites recensées » de l'article sur les fuites de données est
alimenté par le flux RSS public de [bonjourlafuite.eu.org](https://bonjourlafuite.eu.org/)
(projet libre sous licence MIT).

Le flux est lu **au build**, dans [`src/data/leaks.ts`](src/data/leaks.ts) :
aucun JavaScript n'est envoyé au visiteur et aucune requête tierce n'est faite
depuis son navigateur. Si le flux est injoignable, le build retombe sur
`src/data/leaks-snapshot.json` plutôt que d'échouer.

Les données ne se rafraîchissent donc qu'au déploiement : le workflow GitHub
Actions tourne une fois par jour pour ça (`schedule` dans
`.github/workflows/astro.yml`), à `17 4 * * *` — soit 6 h 17 à Paris en heure
d'été, 5 h 17 en hiver. La minute n'est pas ronde exprès : les crons GitHub
partent d'une file partagée et les heures pile y sont les plus encombrées.

Pour afficher ce bloc sous un article, ajouter `widget: leaks` à son frontmatter.

## Mettre à jour la page /now

Éditer `src/data/now.ts`, et surtout `nowUpdatedAt` — l'indicateur de
fraîcheur affiché sur la page en dépend.

## Changelog

Ajouter une entrée en tête de `src/data/changelog.ts`. La plus récente est
affichée dans le footer de toutes les pages.
