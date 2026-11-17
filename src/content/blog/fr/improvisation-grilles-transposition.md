---
title: "Improviser sur une grille : gammes, transposition et un saxhorn basse en Sib"
description: "Une grille d'accords, une gamme par accord, et la bonne note écrite pour son instrument. Les bases de l'improvisation, avec une application pour construire sa grille et lire ses notes en Sib."
pubDate: 2026-11-17
tags: ["Musique", "Improvisation", "JavaScript"]
draft: true
ai: drafting
sources:
  - label: "L'application : Grille d'impro (démo)"
    href: "https://justinsillou.github.io/impro/"
  - label: "Le code source"
    href: "https://github.com/justinsillou/impro"
  - label: "Wikipédia — Improvisation (musique)"
    href: "https://fr.wikipedia.org/wiki/Improvisation_(musique)"
  - label: "Wikipédia — Instrument transpositeur"
    href: "https://fr.wikipedia.org/wiki/Instrument_transpositeur"
  - label: "Wikipédia — Transposition (musique)"
    href: "https://fr.wikipedia.org/wiki/Transposition_(musique)"
  - label: "Wikipédia — Mode (musique)"
    href: "https://fr.wikipedia.org/wiki/Mode_(musique)"
  - label: "Wikipédia — Gamme pentatonique"
    href: "https://fr.wikipedia.org/wiki/Gamme_pentatonique"
  - label: "Wikipédia — Gamme blues"
    href: "https://fr.wikipedia.org/wiki/Gamme_blues"
  - label: "Wikipédia — Saxhorn"
    href: "https://fr.wikipedia.org/wiki/Saxhorn"
  - label: "Wikipedia (EN) — Chord–scale system"
    href: "https://en.wikipedia.org/wiki/Chord-scale_system"
  - label: "Wikipedia (EN) — Twelve-bar blues"
    href: "https://en.wikipedia.org/wiki/Twelve-bar_blues"
  - label: "Wikipedia (EN) — ii–V–I progression"
    href: "https://en.wikipedia.org/wiki/Ii%E2%80%93V%E2%80%93I_progression"
---

<!-- TODO Justin : ajouter ici 2-3 phrases vraies sur ton rapport à l'impro
     (d'où vient l'envie, ce qui te bloque, dans quel groupe tu joues). -->

Improviser, c'est jouer des notes qui n'étaient pas écrites. Ce n'est pas jouer
n'importe quoi : sur un morceau, **les accords imposent un cadre**, et les notes
qu'on choisit tiennent dedans ou en sortent exprès. Ce cadre s'écrit sur une
feuille, on l'appelle une **grille**.

J'ai fait un petit outil pour s'y entraîner, [Grille d'impro](https://justinsillou.github.io/impro/).
On y tape une grille, et pour chaque accord il affiche **les notes à jouer,
écrites pour son instrument**. Le second point compte autant que le premier :
sur un saxhorn basse en Sib, ce qu'on lit n'est pas ce qu'on entend.

Cet article explique ce qu'il y a derrière : la grille, la gamme, la
transposition, et une méthode pour commencer.

## Une grille, c'est quoi ?

Une suite d'accords répartis sur des mesures. La plus connue est le **blues en
12 mesures** :

| Mesures | 1-4 | 5-6 | 7-8 | 9 | 10 | 11-12 |
|---|---|---|---|---|---|---|
| Accord | I7 | IV7 | I7 | V7 | IV7 | I7 |

Les chiffres romains sont des **degrés** : I est l'accord construit sur la
tonique, IV sur la quatrième note de la gamme, V sur la cinquième. Écrire en
degrés, c'est écrire la grille une fois pour toutes, puis la jouer dans
n'importe quelle tonalité. En Do, le blues donne `C7 – F7 – G7`. En Sib, il donne
`Bb7 – Eb7 – F7`.

Autre grille à connaître : le **II–V–I**, la brique de base du jazz. En Do :
`Dm7 – G7 – Cmaj7`. Beaucoup de standards ne sont qu'une suite de II–V–I
dans des tonalités différentes. L'application propose les deux, plus quelques
autres, à charger dans la tonalité de son choix.

## Une gamme par accord

Une gamme est une suite de notes qui sonne bien ensemble. Celle de Do majeur :

```
Do  Ré  Mi  Fa  Sol  La  Si  Do
```

La même suite de notes, jouée en partant d'une autre note, donne un **mode**.
Ré – Mi – Fa – Sol – La – Si – Do – Ré, ce sont les mêmes touches blanches,
mais le son est différent : c'est le mode **dorien**. Chaque mode a son
« goût », et on les associe aux accords :

| Accord (exemple) | Gamme conseillée | Pourquoi |
|---|---|---|
| Cmaj7 | Ionien (majeur), ou Lydien | les notes de l'accord sont dedans |
| Dm7 | Dorien | une gamme mineure avec la sixte majeure |
| G7 | Mixolydien | une gamme majeure avec la septième mineure |
| Bm7♭5 | Locrien | contient la quinte diminuée |
| G7♭9 | Phrygien dominant | contient la neuvième bémol |

C'est ce qu'on appelle la [correspondance accord-gamme](https://en.wikipedia.org/wiki/Chord-scale_system)
(*chord-scale*). C'est une **simplification utile**, pas une loi : dans un vrai
morceau, plusieurs gammes marchent sur un même accord, et le choix est une
question de goût. L'application en propose deux ou trois par accord.

### Les raccourcis : pentatonique et blues

Sept notes par gamme, c'est beaucoup à gérer quand on débute. La
[**pentatonique**](https://fr.wikipedia.org/wiki/Gamme_pentatonique) n'en garde
cinq. La pentatonique mineure (`1 ♭3 4 5 ♭7`) passe sur presque tout un blues.
En lui ajoutant la quinte bémol (`♭5`), on obtient la
[**gamme blues**](https://fr.wikipedia.org/wiki/Gamme_blues).

## Le point qui change tout : jouer les notes de l'accord sur les temps

Connaître la gamme ne suffit pas. Ce qui donne l'impression de « jouer sur
l'accord », c'est de **tomber sur une note de l'accord** (fondamentale, tierce,
quinte, septième) **aux temps forts**, et d'utiliser le reste de la gamme pour
passer d'une note d'accord à la suivante.

Dans l'application, ces notes sont en orange sur la portée. Le bouton « Idée de
phrase » construit huit croches sur ce principe : notes d'accord sur les temps,
notes de gamme entre les deux. Ce n'est pas de la musique géniale. C'est un
point de départ qu'on joue, puis qu'on déforme.

## La transposition, ou pourquoi ma partition ment

Un instrument **transpositeur** est un instrument dont les notes écrites ne
correspondent pas aux notes qu'on entend. Le [saxhorn
basse](https://fr.wikipedia.org/wiki/Saxhorn) en Sib en est un : quand il lit un
`Do`, il sonne un `Sib`.

Il y a donc deux mondes :

- les **sons réels** (on dit aussi « concert ») : ce que le piano, la guitare et
  la grille d'accords utilisent ;
- les **sons écrits** : ce que je lis sur ma partition.

Pour un instrument en **Sib** (trompette, clarinette), la note écrite est une
seconde majeure **plus haut** que le son réel. Si le groupe joue un Do, la
trompette lit un Ré. Pour un saxhorn basse en Sib écrit en clé de sol, comme
dans les brass bands, c'est une **neuvième majeure** plus haut (une octave plus
une seconde), parce que l'instrument est une octave plus grave qu'une trompette
en Sib.

| Instrument | Écrit par rapport au son réel |
|---|---|
| Do (flûte, violon, piano) | pareil |
| Sib (trompette, clarinette) | +1 ton |
| Mib (sax alto) | + sixte majeure (9 demi-tons) |
| Fa (cor) | + quinte juste (7 demi-tons) |
| Sib grave, clé de sol (saxhorn basse, euphonium) | + neuvième majeure (14 demi-tons) |
| Clé de fa, non transposé (tuba, trombone) | pareil |

> **À vérifier sur ta partition.** Selon les orchestres, le saxhorn basse en
> Sib se lit en clé de sol (transposé) ou en clé de fa (non transposé, comme un
> trombone). Les deux existent. L'application propose les deux ; le bon choix
> est celui de ta partition.

### Exemple : un blues en Sib

Le groupe joue un blues en **Sib** (réel) : `Bb7 – Eb7 – F7`. Pour mon saxhorn
basse en clé de sol, j'ajoute 14 demi-tons à chaque accord. Résultat à lire :

```
Réel      Bb7   Eb7   F7
Écrit      C7    F7   G7
```

Le blues en Sib, du point de vue du groupe, devient un blues en **Do**, du point
de vue de mon instrument. Je peux utiliser la gamme blues de Do
(`Do Mib Fa Fa♯ Sol Sib`) : écrite en Do, elle sonne comme la gamme blues de Sib.

Ça se fait à la main, mais ça se trompe vite : un dièse oublié, une octave
décalée. Dans l'application, les accords se tapent en sons réels, et
l'accord écrit s'affiche sous chaque mesure.

## Utiliser l'application

1. **Choisir son instrument** : c'est ce qui décide de la transposition et de la
   clé affichée.
2. **Charger une grille** type (blues, II–V–I, Anatole…) dans la tonalité de son
   choix, ou taper la sienne, par exemple `Dm7 G7` pour deux accords dans la
   mesure.
3. **Cliquer sur un accord** : les notes de l'accord, les gammes possibles et leur
   portée apparaissent.
4. **Écouter la grille** avec une basse et un métronome, en boucle, puis
   improviser dessus.
5. **Copier le lien** pour partager sa grille : elle est encodée dans l'adresse,
   rien n'est envoyé nulle part.

<!-- TODO Justin : ajouter 1-2 captures d'écran dans public/ et les référencer ici. -->

## Comment je m'y prends pour commencer

C'est une méthode, pas une recette :

1. Une seule gamme (la pentatonique mineure ou la gamme blues) sur un blues lent.
2. Viser la **tierce** de chaque accord sur le premier temps de la mesure.
3. Jouer **moins** de notes. Une note bien placée vaut mieux que huit au hasard.
4. Ensuite seulement, changer de gamme à chaque accord.
5. Et surtout, écouter des disques : l'oreille apprend plus vite que le cerveau.

## Ce que l'outil ne fait pas

- Il ne **juge pas** ce que tu joues : il ne t'écoute pas.
- Il ne gère que le **4/4** et des accords simples (majeur, mineur, septièmes,
  demi-diminué, diminué, 7♭9, 6).
- Les gammes proposées sont **un choix parmi d'autres**.
- Le son est un synthé minimal. C'est un support de travail, pas un
  accompagnement réaliste.

C'est un **mini projet**, comme le [solveur de Rubik's
Cube](/blog/ia-utile-apprendre-a-bien-lutiliser) ou les [doigtés pour
cuivres](/blog/doigtes-cuivres-musescore) : peu de code, sans dépendance, et
qui se [teste en ligne](https://justinsillou.github.io/impro/).
