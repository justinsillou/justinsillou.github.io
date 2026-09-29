---
title: "Utiliser l'IA pour de bon : ce que m'a appris un Rubik's Cube"
description: "Un solveur de Rubik's Cube construit avec une IA, et surtout ce que j'ai appris en route : rester critique, citer ses sources, les croiser, et dire ce qu'on a délégué."
pubDate: 2026-09-29
tags: ["IA", "Apprentissage", "Méthode"]
draft: true
ai: drafting
sources:
  - label: "Le projet : Rubik's Graph Solver (démo)"
    href: "https://justinsillou.github.io/rubiks-graph-solver/"
  - label: "Le déroulé complet, version par version (PROMPTING.md)"
    href: "https://github.com/justinsillou/rubiks-graph-solver/blob/main/docs/PROMPTING.md"
  - label: "Les sources du projet (SOURCES.md)"
    href: "https://github.com/justinsillou/rubiks-graph-solver/blob/main/docs/SOURCES.md"
  - label: "Anthropic — AI Fluency: Framework & Foundations (cadre des « 4D »)"
    href: "https://anthropic.skilljar.com/ai-fluency-framework-foundations"
  - label: "Anthropic Academy"
    href: "https://www.anthropic.com/learn"
  - label: "Anthropic — Prompt engineering overview"
    href: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview"
  - label: "Anthropic — Claude Code best practices"
    href: "https://www.anthropic.com/engineering/claude-code-best-practices"
  - label: "Solving a Rubik's Cube Using Its Local Graph Structure (arXiv, 2024)"
    href: "https://arxiv.org/html/2408.07945v1"
  - label: "Wikipédia — Optimal solutions for the Rubik's Cube"
    href: "https://en.wikipedia.org/wiki/Optimal_solutions_for_the_Rubik%27s_Cube"
  - label: "Rokicki et al. — The Diameter of the Rubik's Cube Group Is Twenty"
    href: "https://doi.org/10.1137/120867366"
  - label: "Kociemba — The two-phase algorithm"
    href: "http://kociemba.org/cube.htm"
---

Je ne suis pas là pour dire que l'IA est géniale, ni qu'elle est dangereuse. Je
veux juste raconter comment je m'en suis servi pour un vrai projet, ce qui a
marché, ce qui a raté, et ce que j'en garde.

Le projet : un **solveur de Rubik's Cube** qui montre la solution comme un
chemin dans un graphe. C'est un prétexte. Ce qui m'intéressait, c'était
d'apprendre à **bien utiliser l'IA**, pas d'avoir un cube résolu de plus sur
Internet (il y en a déjà plein).

Le résultat est [en ligne](https://justinsillou.github.io/rubiks-graph-solver/).
Mais le plus utile, à mon avis, est ailleurs : dans la façon de travailler.

## Utile, ça veut dire quoi ?

Pour moi, l'IA est utile quand elle m'aide à **comprendre** ou à **faire mieux**,
pas quand elle fait à ma place ce que je n'ai pas compris.

Si je lui demande un solveur et que je copie le résultat, je n'ai rien appris.
Si je lui demande un solveur, puis « pourquoi cet algorithme ? », « que se
passe-t-il si je change de coup ? », « qu'est-ce que tu n'as pas vérifié ? », là
j'apprends. Même code au final, mais pas du tout la même journée.

## Ce que j'ai fait, dans l'ordre

Le détail est dans le [guide du dépôt](https://github.com/justinsillou/rubiks-graph-solver/blob/main/docs/PROMPTING.md).
Voici la version courte :

1. **Je pars de sources, pas d'une page blanche.** Avant le premier message, j'ai
   mis trois liens dans un fichier : un article scientifique, un fil Reddit, une
   page Wikipédia. L'IA est partie de ma matière au lieu d'inventer la sienne.
2. **Je demande un POC.** Une petite version qui marche, puis on améliore. J'ai
   avancé par versions, de la 0.1 à la 0.7.
3. **Je décris le public.** « Une explication pour un enfant et une pour un
   doctorant, côte à côte. » C'est l'une des consignes qui a le mieux marché.
4. **Je pose des questions de fond**, pas seulement « ajoute ce bouton ». Par
   exemple : « le mélange se fait en un nombre fini de coups, est-ce que ça
   change le résultat ? » La réponse est dans la page.
5. **Je dis ce qui ne va pas, pas comment le réparer.** « On ne comprend pas la
   relation entre le cube et le graphe » a donné une meilleure idée (dessiner
   les sommets comme de vrais cubes) que si j'avais dicté la solution.
6. **Je garde la main sur ce qui engage** : le style, le public, et le moment de
   publier. L'IA a d'ailleurs demandé confirmation avant.

## Rester critique

C'est le point le plus important, et le plus facile à oublier, parce que l'IA
répond avec aplomb, même quand elle se trompe.

Voilà ce qui s'est réellement passé dans ce projet :

- **Une affirmation mathématique fausse** dans un texte généré. Je l'ai vue à la
  relecture. Un texte bien écrit n'est pas un texte juste.
- **Une numérotation de références décalée** après un ajout.
- **Un premier visuel « trop IA »**, avec les mêmes cartes arrondies partout.
  Le style par défaut d'une IA n'est pas neutre : j'ai dû le challenger.
- **Des captures d'écran qui échouaient.** L'IA l'a dit franchement au lieu de
  prétendre qu'elle avait tout vu, et elle a vérifié autrement.

Mes réflexes, simples :

- Je demande **« qu'as-tu vérifié, et comment ? »** Une IA honnête répond aussi
  sur ce qu'elle n'a *pas* pu vérifier.
- Je préfère les **tests automatiques** à un coup d'œil. Ici, un test résout 20
  cubes mélangés et vérifie que chaque rotation 3D colle au modèle
  mathématique. Il se relance à chaque modification.
- Je **relis tout ce qui sera publié**. Toujours.

## Citer ses sources

Deux raisons.

D'abord, c'est honnête envers les personnes qui liront : elles peuvent vérifier
et aller plus loin. Ensuite, c'est une protection pour moi. Une IA peut
**inventer une référence** qui a l'air vraie : auteur crédible, titre plausible,
et rien derrière.

Donc pour chaque source ajoutée au projet, on a testé le lien et l'identifiant
DOI avant de la citer. La liste complète est dans
[SOURCES.md](https://github.com/justinsillou/rubiks-graph-solver/blob/main/docs/SOURCES.md).

Je cite aussi **l'IA elle-même**. Le README du projet dit que le code et les
textes ont été produits en dialogue avec Claude Code, puis relus et testés. Cet
article aussi : il a été rédigé avec l'aide d'une IA à partir de mes notes et de
mon projet, c'est indiqué en bas de page. Je préfère le dire que le cacher.

## Croiser les sources

Une source seule, même bonne, ne suffit pas. Ce qui m'a aidé, c'est de mélanger
des types de sources qui ne disent pas la même chose de la même façon :

- **Un article scientifique** ([arXiv, 2024](https://arxiv.org/html/2408.07945v1))
  pour l'idée de départ : le cube vu comme un graphe.
- **Un fil Reddit**, pour voir comment des gens en parlent et ce qui les
  intrigue. C'est moins fiable, mais ça donne le ton et les vraies questions.
- **Wikipédia**, pour situer le sujet : quelles sont les solutions optimales
  connues, et par qui.
- **Les publications d'origine** derrière : l'algorithme à deux phases de
  [Kociemba](http://kociemba.org/cube.htm), et la preuve que 20 coups suffisent
  toujours ([Rokicki et al., 2013](https://doi.org/10.1137/120867366)).

Quand deux sources se contredisent, ou qu'une affirmation de l'IA ne se retrouve
nulle part, c'est le signal pour creuser. Pas pour choisir celle qui m'arrange.

## Ce que j'en retiens

Le cours gratuit d'Anthropic sur l'[AI Fluency](https://anthropic.skilljar.com/ai-fluency-framework-foundations)
propose quatre mots pour s'y retrouver. Je les ai trouvés utiles parce qu'ils
sont concrets :

| Mot | La question à se poser |
|---|---|
| **Délégation** | Qu'est-ce que je confie à l'IA, qu'est-ce que je garde ? |
| **Description** | Est-ce que j'explique clairement ce que je veux ? |
| **Discernement** | Est-ce que je vérifie ce qu'elle produit ? |
| **Diligence** | Est-ce que je l'utilise de façon responsable et transparente ? |

Je n'ai pas fait de ce projet une œuvre d'art. Il a des limites, et je les
connais. Mais il m'a appris plus qu'un tutoriel, parce que j'ai été obligé de
comprendre ce que je demandais, et de contrôler ce que je recevais.

Si tu veux essayer, le fichier [PROMPTING.md](https://github.com/justinsillou/rubiks-graph-solver/blob/main/docs/PROMPTING.md)
contient un modèle de premier message à copier, avec les conseils classés selon
ces quatre mots. Commence petit, garde tes sources, relis tout.

*Projet personnel, non affilié à Anthropic.*
