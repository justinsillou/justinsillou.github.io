---
title: "Fuites de données en France : l'été où tout a lâché"
description: "Le fisc trois fois, l'Éducation nationale, SFR, un éditeur médical : en quelques semaines de cet été 2026, la France a exposé ses fichiers les plus sensibles. Ce qui a fuité, comment, et ce qu'on peut encore faire."
pubDate: 2026-08-21
tags: ["Sécurité", "RGPD", "Veille"]
evergreen: true
widget: leaks
ai: editing
sources:
  - label: "CNIL — Rapport annuel 2025"
    href: "https://www.cnil.fr/fr/rapport-annuel-2025"
  - label: "Bercy — Accès illégitime au SI de la DGFiP"
    href: "https://presse.economie.gouv.fr/acces-illegitime-au-systeme-dinformation-de-la-direction-generale-des-finances-publiques/"
  - label: "education.gouv.fr — Incident de sécurité, juillet 2026"
    href: "https://www.education.gouv.fr/incident-de-securite-affectant-les-donnees-de-personnels-de-l-education-nationale-505407"
  - label: "ZATAZ — Le ministère de l'Éducation confirme son piratage"
    href: "https://www.zataz.com/le-ministere-de-leducation-confirme-son-piratage/"
  - label: "20 Minutes — SFR victime d'une fuite affectant ses abonnés fibre"
    href: "https://www.20minutes.fr/high-tech/by-the-web/4240043-20260820-cyberattaque-encore-operateur-sfr-victime-fuite-donnees-affectant-abonnes-fibre"
  - label: "20 Minutes — Le fisc, passoire numérique ?"
    href: "https://www.20minutes.fr/high-tech/by-the-web/4239691-20260818-piratage-fisc-passoire-numerique-france-plus-vulnerable-autres-pays-europeens"
  - label: "Le HuffPost — Il n'y a pas que le fisc qui se fait pirater"
    href: "https://www.huffingtonpost.fr/france/article/il-n-y-a-pas-que-le-fisc-qui-se-fait-pirater-chaque-jour-des-milliers-de-donnees-fuitent-en-france_307468.html"
  - label: "C'est qui qui a fuité aujourd'hui ?"
    href: "https://bonjourlafuite.eu.org/"
  - label: "Have I Been Pwned"
    href: "https://haveibeenpwned.com/"
---

Il y a quelques années, une fuite de données faisait grand bruit pendant une semaine. 
Aujourd'hui, elle se résume à une courte note — quand elle n'est pas ignorée. Ce n'est pas que
le sujet soit devenu moins grave : c'est qu'il est devenu quotidien. L'été 2026 a
enchaîné le fisc, l'Éducation nationale, un opérateur télécom et un éditeur
médical, à quelques jours d'intervalle.

## Le décompte

Dans son rapport annuel, la CNIL a enregistré **6 167 notifications de violations
de données en 2025**, soit 9,5 % de plus qu'en 2024 et environ 50 % de plus qu'il
y a trois ans. Sur le seul premier trimestre 2026, elle en comptait déjà plus de
2 730. La moitié de ces violations résultent de piratages, et visent en priorité
l'administration publique, la santé et le secteur financier.

Le recensement communautaire de *[C'est qui qui a fuité aujourd'hui ?][blf]*, qui
ne retient que les fuites documentées publiquement, donne le même mouvement vu
d'en bas : 43 fuites référencées pour 2024, 158 pour 2025, plus de 330 depuis
janvier 2026. Ce n'est pas une mesure exhaustive de la réalité — seulement de ce
qui devient public.

## L'été 2026, en trois dossiers

**Le fisc, trois fois (combo).** La DGFiP a d'abord reconnu en février un accès illégitime
au fichier national des comptes bancaires (FICOBA) : environ 1,2 million de
comptes, avec identité, adresse, identifiant fiscal et IBAN. Fin juin, nouvelle
intrusion, cette fois dans le système d'information fiscal — état civil, numéro
SPI, situation familiale, revenu fiscal de référence, taux de prélèvement à la
source. Le 18 août, Bercy en reconnaît deux de plus : le serveur de données
cadastrales, compromis fin juillet et réévalué à environ 1,8 million de comptes,
puis le portail des successions vacantes.

**L'Éducation nationale, quatre fois.** 243 000 agents en mars, la plateforme
ÉduConnect en avril, puis l'intrusion de la nuit du 25 juillet, rendue publique le
31. L'accès initial serait passé par un VPN. Le ministère confirme l'intrusion et
l'exfiltration, mais poursuit ses expertises sans valider les volumes revendiqués :
43 Go, 2 500 fichiers, des données d'élèves, de parents, d'enseignants et de
personnels des académies de Créteil et Versailles, ainsi que de la plateforme
nationale I-Prof.

**SFR.** L'opérateur confirme le 20 août une fuite remontant au 2 juillet, via un
portail interne de gestion des raccordements fibre. Le pirate revendique un peu
plus de 2,1 millions de lignes : civilité, nom, prénom, adresse, numéro de mobile,
identifiant de contrat et données techniques de la ligne. Compte désactivé, IP
bloquées, CNIL notifiée, plainte déposée.

Et en toile de fond, la même semaine : 6,8 millions de patients chez un éditeur de
logiciel médical, 3 millions de numéros chez Bloctel — le service anti-démarchage,
ironie comprise —, 80 000 contacts chez un prestataire de Santé publique France,
des documents d'identité et des IBAN chez Suez.

## Le point commun : personne n'a rien vu

Ces trois dossiers ont le même profil. Aucun ne demandait d'exploit sophistiqué :
un compte interne, un accès VPN, un portail partenaire. Pas de coffre-fort forcé —
une clé légitime utilisée par quelqu'un d'autre. Plusieurs analyses de presse
pointent d'ailleurs le retour d'une faille de contrôle d'accès élémentaire, connue
des développeurs depuis vingt ans : deviner l'identifiant du dossier voisin.

Le second point commun est plus gênant. Dans presque tous les cas, ce n'est pas la
supervision de la victime qui a détecté l'intrusion : c'est la revendication
publique de l'attaquant, sur un forum, des semaines après les faits. Le même
pseudonyme revendique SFR, l'Éducation nationale et le fisc. Entre l'accès et
l'annonce, plusieurs semaines pendant lesquelles personne, côté défense, n'a levé
la main.

## Pourquoi ce n'est pas « juste un mot de passe »

Un mot de passe se change. Une adresse mail, à la rigueur, aussi. Le reste, non.

Ces bases contiennent de l'**identité durable** : nom, date de naissance, adresse,
numéro fiscal, numéro de sécurité sociale, IBAN, revenu fiscal de référence.
Recoupées entre elles — et elles le sont, c'est tout l'intérêt du marché —, elles
permettent de reconstituer un dossier crédible sur une personne. C'est ce qui
alimente ensuite :

- le **phishing ciblé**, avec des messages qui citent votre situation fiscale,
  votre contrat ou l'école de vos enfants, donc bien plus difficiles à repérer ;
- l'**usurpation d'identité** pour ouvrir un compte, souscrire un crédit ou obtenir
  un duplicata de document ;
- le **SIM swapping**, qui consiste à faire transférer votre numéro pour
  intercepter les codes de validation ;
- les **prélèvements frauduleux**, quand l'IBAN fait partie du lot.

Le RGPD impose de notifier sous 72 heures. Il n'impose évidemment pas que les
données redeviennent secrètes.

## Ce qui est à votre portée

Ni la CNIL ni le RGPD ne peuvent annuler une fuite. En revanche, quelques gestes
simples peuvent vous servir :

1. **Vérifier l'exposition.** [Have I Been Pwned](https://haveibeenpwned.com/) pour
   les adresses mail et numéros de téléphone. Incomplet, mais gratuit et immédiat.
2. **Un mot de passe unique par service**, dans un gestionnaire. C'est le seul
   geste qui empêche qu'une fuite chez A ouvre un compte chez B.
3. **L'authentification à deux facteurs**, par application plutôt que par SMS —
   précisément à cause du SIM swapping.
4. **Surveiller ses relevés** si un IBAN a fuité. En France, un prélèvement non
   autorisé se conteste pendant 13 mois, et 8 semaines sans justification pour un
   prélèvement autorisé.
5. **Traiter toute sollicitation entrante comme suspecte.** Un interlocuteur qui
   connaît votre revenu fiscal n'est pas pour autant votre centre des impôts.
   Raccrocher et rappeler le numéro officiel reste la meilleure défense.
6. **Exercer ses droits.** L'organisme doit vous informer et préciser ce qui a
   fuité ; à défaut, une plainte est possible auprès de la [CNIL](https://www.cnil.fr/).

## Et du côté de ceux qui développent

Rien de ce qui précède ne relève de la cryptographie avancée. Un compte de
prestataire sans second facteur, une API sans limitation de débit qui laisse
aspirer un fichier client ligne par ligne, un identifiant séquentiel qu'on peut
incrémenter, des journaux que personne ne lit. Les fondamentaux, appliqués aux
accès **légitimes** autant qu'aux accès externes.

La question utile n'est pas « est-ce qu'on peut entrer ? », mais : si un accès
autorisé est détourné, en combien de temps est-ce qu'on le voit et combien de
lignes sortent d'ici là ? Sur les dossiers de cet été, la réponse tient en un mot :
trop.

---

*Article suivi, mis à jour au fil de l'actualité. Les chiffres cités sont ceux
communiqués par les organismes concernés, par la CNIL ou par la presse au moment
de la rédaction ; les volumes revendiqués par les attaquants ne sont pas toujours
confirmés et sont signalés comme tels.*

[blf]: https://bonjourlafuite.eu.org/
