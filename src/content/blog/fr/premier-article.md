---
title: "Premier article, pour voir si ça tient"
description: "Un article de test, gardé en ligne : il sert de gabarit et vérifie que la mise en forme, le sommaire et les filtres fonctionnent."
pubDate: 2026-06-14
tags: ["Divers"]
sources:
  - label: "Le code du site"
    href: "https://github.com/justinsillou/justinsillou.github.io"
---

Celui-ci ne raconte rien. Il existe pour vérifier que la chaîne complète tient
debout : écrire un fichier Markdown, le voir apparaître dans la liste, le
retrouver par son thème, et obtenir une page correctement mise en forme sans
rien toucher d'autre.

Je le garde en ligne plutôt que de le supprimer : quand j'écrirai le suivant
dans six mois, il me servira de gabarit.

## Ce que ça vérifie

Un titre de niveau deux comme celui-ci alimente le sommaire, à condition qu'il y
en ait au moins deux. En dessous, les **passages en gras**, l'*italique*, le
`code en ligne` et les [liens](https://github.com/justinsillou) doivent tous
rester lisibles en thème clair comme en thème sombre.

Une liste, tant qu'à faire :

- premier élément ;
- deuxième élément, un peu plus long pour voir comment il se comporte quand la
  ligne dépasse la largeur de la colonne de texte ;
- troisième élément.

Et une liste ordonnée, qui ne se numérote pas de la même manière :

1. étape une ;
2. étape deux ;
3. étape trois.

## Un bloc de code

```ts
export const readingTime = (body: string) =>
  Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));
```

> Une citation, pour finir le tour du propriétaire.

C'est tout. Le prochain article aura un sujet.
