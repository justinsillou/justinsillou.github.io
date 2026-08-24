import type { Lang } from "../i18n/utils";

/**
 * Contenu du CV.
 *
 * Les champs de texte sont bilingues : `{ fr: "…", en: "…" }`. Ce qui ne
 * dépend pas de la langue (technos, liens, dates numériques) reste écrit
 * une seule fois. `getCv(lang)` renvoie la version aplatie utilisée par la
 * page — y compris les listes déduites (stack, compétences transversales).
 */

/** Un texte dans les deux langues du site. */
export type Localized = Record<Lang, string>;

export type ExperienceProject = {
  name: string;
  description: Localized;
  tags?: string[];
};

export type Experience = {
  role: Localized;
  company: string;
  contract: Localized;
  period: Localized;
  duration: Localized;
  location: string;
  note?: Localized;
  tags?: string[];
  softSkills?: Localized[];
  projects?: ExperienceProject[];
};

export type PeriodGroup = {
  label: Localized;
  items: Experience[];
};

export type Education = {
  degree: Localized;
  school: Localized;
  link?: string;
};

/**
 * Compétences transversales.
 *
 * Référencées plutôt que recopiées : la liste de la sidebar se déduit des
 * expériences, et deux mentions de la même compétence doivent être le même
 * objet pour être dédoublonnées.
 */
const soft = {
  team: { fr: "Travail en équipe", en: "Teamwork" },
  autonomy: { fr: "Autonomie", en: "Autonomy" },
  problemSolving: { fr: "Résolution de problèmes", en: "Problem solving" },
  adaptability: { fr: "Adaptabilité", en: "Adaptability" },
  organisation: { fr: "Organisation", en: "Organisation" },
  communication: { fr: "Communication", en: "Communication" },
  projectManagement: { fr: "Gestion de projet", en: "Project management" },
  customerRelations: { fr: "Relation client", en: "Customer relations" },
  frontDesk: { fr: "Accueil client", en: "Front-desk service" },
  rigour: { fr: "Rigueur", en: "Attention to detail" },
  confidentiality: { fr: "Confidentialité", en: "Confidentiality" },
} satisfies Record<string, Localized>;

/**
 * Expériences professionnelles
 */
export const periods: PeriodGroup[] = [
  {
    label: { fr: "2024 — Aujourd'hui", en: "2024 — Present" },
    items: [
      {
        role: { fr: "Développeur Back-end", en: "Back-end Developer" },
        company: "Promatec",
        contract: { fr: "CDI", en: "Permanent contract" },
        period: {
          fr: "sept. 2024 — aujourd'hui",
          en: "Sept. 2024 — present",
        },
        duration: { fr: "2 ans", en: "2 years" },
        location: "Bondues, Hauts-de-France",

        projects: [
          {
            name: "Promatec",
            description: {
              fr: "Développement et maintenance des outils internes et des solutions web pour les besoins de l'entreprise et de ses clients.",
              en: "Building and maintaining internal tools and web solutions for the company and its customers.",
            },
            tags: ["PHP", "SQL", "API", "JavaScript"],
          },
          {
            name: "MailSecure",
            description: {
              fr: "Développement de la solution MailSecure, avec une forte implication sur le développement applicatif, le back-end, les API et l'environnement technique.",
              en: "Development of the MailSecure product, with heavy involvement in application development, the back-end, the APIs and the technical environment.",
            },
            tags: ["Next.js", "TypeScript", "React", "Docker", "API"],
          },
        ],

        softSkills: [
          soft.team,
          soft.autonomy,
          soft.problemSolving,
          soft.adaptability,
        ],
      },
    ],
  },

  {
    label: { fr: "2022 — 2024", en: "2022 — 2024" },
    items: [
      {
        role: { fr: "Développeur Back-end", en: "Back-end Developer" },
        company: "Promatec",
        contract: { fr: "Alternance", en: "Apprenticeship" },
        period: { fr: "sept. 2022 — août 2024", en: "Sept. 2022 — Aug. 2024" },
        duration: { fr: "2 ans", en: "2 years" },
        location: "Bondues, Hauts-de-France",
        tags: ["PHP", "SQL", "Linux / Bash", "API"],
        softSkills: [soft.team, soft.autonomy, soft.organisation],
      },

      {
        role: { fr: "Développeur Full-stack", en: "Full-stack Developer" },
        company: "Local & Toi",
        contract: { fr: "Projet étudiant", en: "Student project" },
        period: { fr: "sept. 2023 — janv. 2024", en: "Sept. 2023 — Jan. 2024" },
        duration: { fr: "5 mois", en: "5 months" },
        location: "Villeneuve-d'Ascq, Hauts-de-France",
        note: { fr: "Projet Platine", en: "Platine project" },
        tags: ["Flutter", "Figma"],
        softSkills: [soft.team, soft.communication, soft.projectManagement],
      },
    ],
  },

  {
    label: { fr: "2018 — 2022", en: "2018 — 2022" },
    items: [
      {
        role: { fr: "Employé polyvalent", en: "Retail Assistant" },
        company: "Stokomani",
        contract: { fr: "Intérimaire", en: "Temporary contract" },
        period: { fr: "juil. 2022 — août 2022", en: "July 2022 — Aug. 2022" },
        duration: { fr: "2 mois", en: "2 months" },
        location: "Lys-lez-Lannoy, Hauts-de-France",
        softSkills: [
          soft.customerRelations,
          soft.team,
          soft.adaptability,
          soft.organisation,
        ],
      },

      {
        role: { fr: "Développeur Web", en: "Web Developer" },
        company: "Auto-Entreprise Fabien Pamelard",
        contract: { fr: "Stage", en: "Internship" },
        period: { fr: "avr. 2021 — août 2021", en: "Apr. 2021 — Aug. 2021" },
        duration: { fr: "5 mois", en: "5 months" },
        location: "Armentières, Hauts-de-France",
        note: {
          fr: "Stage de fin de Licence",
          en: "Final-year bachelor's internship",
        },
        tags: ["HTML", "CSS", "JavaScript", "PrestaShop"],
        softSkills: [soft.autonomy, soft.communication, soft.organisation],
      },

      {
        role: { fr: "Auxiliaire de banque", en: "Bank Clerk" },
        company: "Groupe Crédit du Nord",
        contract: { fr: "CDD", en: "Fixed-term contract" },
        period: { fr: "août 2018", en: "Aug. 2018" },
        duration: { fr: "1 mois", en: "1 month" },
        location: "Lumbres, Hauts-de-France",
        note: {
          fr: "Expérience renouvelée en août 2019 au Crédit du Nord de Watten, ainsi que des missions d'intérim.",
          en: "Repeated in August 2019 at the Crédit du Nord branch in Watten, along with temporary assignments.",
        },
        softSkills: [
          soft.frontDesk,
          soft.rigour,
          soft.confidentiality,
          soft.organisation,
        ],
      },
    ],
  },
];

/**
 * Formation
 */
export const education: Education[] = [
  {
    degree: {
      fr: "Master — STS, Parcours E-Services, Mention Informatique",
      en: "Master's degree — Computer Science, E-Services track",
    },
    school: { fr: "Université de Lille", en: "University of Lille" },
    link: "https://diplome-certificat.univ-lille.fr/index.html?key=D12824758A4F95CAC319D56AFFFD13ED9E29127428FF06E484826448207792D2YXlkMXltWTRCd1J2QXRXMTE1SkFUQzRmWnBTbVFBYjRnNGtQa2Z1UCtJRDl6elBI",
  },

  {
    degree: {
      fr: "Licence — STS, Parcours Informatique",
      en: "Bachelor's degree — Computer Science",
    },
    school: { fr: "Université de Lille", en: "University of Lille" },
    link: "https://diplome-certificat.univ-lille.fr/index.html?key=8F449EDDB7A37213CE6EA7553DEFEB993E65F275F47CE06702A419391B056694MkVWYW9uMlFDUHlvY0pTaE9vVkNMcWhBZUkxeTlQSEZqeGJHQXY0RDk0UmlrZzdx",
  },
];

/**
 * Classification des compétences techniques.
 */
export const skillCategories: Record<string, string> = {
  PHP: "back",
  SQL: "back",
  API: "back",

  JavaScript: "front",
  TypeScript: "front",
  React: "front",
  "Next.js": "front",
  HTML: "front",
  CSS: "front",

  Docker: "tools",
  "Linux / Bash": "tools",

  Flutter: "other",
  Figma: "other",
  PrestaShop: "other",
};

const SKILL_GROUP_TITLES: Record<string, Localized> = {
  back: { fr: "Back-end", en: "Back-end" },
  front: { fr: "Front-end", en: "Front-end" },
  tools: { fr: "Outils & environnement", en: "Tooling & environment" },
  other: { fr: "Autres", en: "Other" },
};

const SKILL_GROUP_ORDER = ["back", "front", "tools", "other"];

/**
 * Liste automatique des compétences techniques.
 * Les noms de technos ne dépendent pas de la langue.
 */
export const skillList = [
  ...new Set(
    periods.flatMap((group) =>
      group.items.flatMap((experience) => [
        ...(experience.tags ?? []),

        ...(experience.projects?.flatMap((project) => project.tags ?? []) ?? []),
      ]),
    ),
  ),
];

/**
 * Langues
 */
export const languages: { name: Localized; level: Localized }[] = [
  {
    name: { fr: "Français", en: "French" },
    level: { fr: "Langue maternelle", en: "Native" },
  },

  {
    name: { fr: "Anglais", en: "English" },
    level: { fr: "Professionnel", en: "Professional working proficiency" },
  },
];

/**
 * Centres d'intérêt
 */
export const interests: { title: Localized; description: Localized }[] = [
  {
    title: { fr: "Musique", en: "Music" },
    description: {
      fr: "Tubiste au sein de l'Harmonie d'Aire-sur-la-Lys depuis septembre 2010. Batterie et guitare en autodidacte.",
      en: "Tuba player with the Harmonie d'Aire-sur-la-Lys since September 2010. Self-taught on drums and guitar.",
    },
  },

  {
    title: { fr: "Sport", en: "Sport" },
    description: {
      fr: "Course à pied, randonnée, escalade, fléchettes.",
      en: "Running, hiking, climbing, darts.",
    },
  },

  {
    title: { fr: "Loisirs", en: "Pastimes" },
    description: {
      fr: "Échecs, jeux de société, lecture.",
      en: "Chess, board games, reading.",
    },
  },
];

/**
 * Informations complémentaires
 */
export const additionalInfo: { title: Localized; description: Localized }[] = [
  {
    title: { fr: "Permis", en: "Driving licence" },
    description: {
      fr: "Permis B et A2",
      en: "Category B and A2 licences",
    },
  },

  {
    title: { fr: "Mobilité", en: "Mobility" },
    description: { fr: "Véhiculé", en: "Own vehicle" },
  },
];

/** Le CV complet, dans une seule langue. */
export function getCv(lang: Lang) {
  const pick = (value: Localized) => value[lang] ?? value.fr;

  const softSkillList = [
    ...new Set(
      periods.flatMap((group) =>
        group.items.flatMap((experience) => experience.softSkills ?? []),
      ),
    ),
  ]
    .map(pick)
    .sort((a, b) => a.localeCompare(b, lang));

  const skillGroups = SKILL_GROUP_ORDER.map((category) => ({
    title: pick(SKILL_GROUP_TITLES[category]),

    skills: skillList
      .filter((skill) => (skillCategories[skill] ?? "other") === category)
      .sort(),
  }));

  return {
    periods: periods.map((group) => ({
      label: pick(group.label),

      items: group.items.map((experience) => ({
        role: pick(experience.role),
        company: experience.company,
        contract: pick(experience.contract),
        period: pick(experience.period),
        duration: pick(experience.duration),
        location: experience.location,
        note: experience.note ? pick(experience.note) : undefined,
        tags: experience.tags,
        softSkills: experience.softSkills?.map(pick),
        projects: experience.projects?.map((project) => ({
          name: project.name,
          description: pick(project.description),
          tags: project.tags,
        })),
      })),
    })),

    education: education.map((entry) => ({
      degree: pick(entry.degree),
      school: pick(entry.school),
      link: entry.link,
    })),

    skillList,
    skillGroups,
    softSkillList,

    languages: languages.map((language) => ({
      name: pick(language.name),
      level: pick(language.level),
    })),

    interests: interests.map((interest) => ({
      title: pick(interest.title),
      description: pick(interest.description),
    })),

    additionalInfo: additionalInfo.map((info) => ({
      title: pick(info.title),
      description: pick(info.description),
    })),
  };
}
