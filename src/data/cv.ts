export type ExperienceProject = {
  name: string;
  description: string;
  tags?: string[];
};

export type Experience = {
  role: string;
  company: string;
  contract: string;
  period: string;
  duration: string;
  location: string;
  note?: string;
  tags?: string[];
  softSkills?: string[];
  projects?: ExperienceProject[];
};

export type PeriodGroup = {
  label: string;
  items: Experience[];
};

export type Education = {
  degree: string;
  school: string;
  link?: string;
};

export type Language = {
  name: string;
  level: string;
};

export type Interest = {
  title: string;
  description: string;
};

export type AdditionalInfo = {
  title: string;
  description: string;
};

/**
 * Expériences professionnelles
 */
export const periods: PeriodGroup[] = [
  {
    label: "2024 — Aujourd'hui",
    items: [
      {
        role: "Développeur Back-end",
        company: "Promatec",
        contract: "CDI",
        period: "sept. 2024 — aujourd'hui",
        duration: "2 ans",
        location: "Bondues, Hauts-de-France",

        projects: [
          {
            name: "Promatec",
            description:
              "Développement et maintenance des outils internes et des solutions web pour les besoins de l'entreprise et de ses clients.",
            tags: ["PHP", "SQL", "API", "JavaScript"],
          },
          {
            name: "MailSecure",
            description:
              "Développement de la solution MailSecure, avec une forte implication sur le développement applicatif, le back-end, les API et l'environnement technique.",
            tags: [
              "Next.js",
              "TypeScript",
              "React",
              "Docker",
              "API",
            ],
          },
        ],

        softSkills: [
          "Travail en équipe",
          "Autonomie",
          "Résolution de problèmes",
          "Adaptabilité",
        ],
      },
    ],
  },

  {
    label: "2022 — 2024",
    items: [
      {
        role: "Développeur Back-end",
        company: "Promatec",
        contract: "Alternance",
        period: "sept. 2022 — août 2024",
        duration: "2 ans",
        location: "Bondues, Hauts-de-France",
        tags: ["PHP", "SQL", "Linux / Bash", "API"],
        softSkills: [
          "Travail en équipe",
          "Autonomie",
          "Organisation",
        ],
      },

      {
        role: "Développeur Full-stack",
        company: "Local & Toi",
        contract: "Projet étudiant",
        period: "sept. 2023 — janv. 2024",
        duration: "5 mois",
        location: "Villeneuve-d'Ascq, Hauts-de-France",
        note: "Projet Platine",
        tags: ["Flutter", "Figma"],
        softSkills: [
          "Travail en équipe",
          "Communication",
          "Gestion de projet",
        ],
      },
    ],
  },

  {
    label: "2018 — 2022",
    items: [
      {
        role: "Employé polyvalent",
        company: "Stokomani",
        contract: "Intérimaire",
        period: "juil. 2022 — août 2022",
        duration: "2 mois",
        location: "Lys-lez-Lannoy, Hauts-de-France",
        softSkills: [
          "Relation client",
          "Travail en équipe",
          "Adaptabilité",
          "Organisation",
        ],
      },

      {
        role: "Développeur Web",
        company: "Auto-Entreprise Fabien Pamelard",
        contract: "Stage",
        period: "avr. 2021 — août 2021",
        duration: "5 mois",
        location: "Armentières, Hauts-de-France",
        note: "Stage de fin de Licence",
        tags: [
          "HTML",
          "CSS",
          "JavaScript",
          "PrestaShop",
        ],
        softSkills: [
          "Autonomie",
          "Communication",
          "Organisation",
        ],
      },

      {
        role: "Auxiliaire de banque",
        company: "Groupe Crédit du Nord",
        contract: "CDD",
        period: "août 2018",
        duration: "1 mois",
        location: "Lumbres, Hauts-de-France",
        note:
          "Expérience renouvelée en août 2019 au Crédit du Nord de Watten, ainsi que des missions d'intérim.",
        softSkills: [
          "Accueil client",
          "Rigueur",
          "Confidentialité",
          "Organisation",
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
    degree:
      "Master — STS, Parcours E-Services, Mention Informatique",
    school: "Université de Lille",
    link: "https://diplome-certificat.univ-lille.fr/index.html?key=D12824758A4F95CAC319D56AFFFD13ED9E29127428FF06E484826448207792D2YXlkMXltWTRCd1J2QXRXMTE1SkFUQzRmWnBTbVFBYjRnNGtQa2Z1UCtJRDl6elBI",
  },

  {
    degree: "Licence — STS, Parcours Informatique",
    school: "Université de Lille",
    link: "https://diplome-certificat.univ-lille.fr/index.html?key=8F449EDDB7A37213CE6EA7553DEFEB993E65F275F47CE06702A419391B056694MkVWYW9uMlFDUHlvY0pTaE9vVkNMcWhBZUkxeTlQSEZqeGJHQXY0RDk0UmlrZzdx",
  },
];

/**
 * Classification des compétences techniques.
 */
export const skillCategories: Record<string, string> = {
  PHP: "Back-end",
  SQL: "Back-end",
  API: "Back-end",

  JavaScript: "Front-end",
  TypeScript: "Front-end",
  React: "Front-end",
  "Next.js": "Front-end",
  HTML: "Front-end",
  CSS: "Front-end",

  Docker: "Outils & environnement",
  "Linux / Bash": "Outils & environnement",

  Flutter: "Autres",
  Figma: "Autres",
  PrestaShop: "Autres",
};

/**
 * Liste automatique des compétences techniques
 */
export const skillList = [
  ...new Set(
    periods.flatMap((group) =>
      group.items.flatMap((experience) => [
        ...(experience.tags ?? []),

        ...(experience.projects?.flatMap(
          (project) => project.tags ?? [],
        ) ?? []),
      ]),
    ),
  ),
];

/**
 * Groupes de compétences affichés dans la sidebar.
 */
export const skillGroups = [
  "Back-end",
  "Front-end",
  "Outils & environnement",
  "Autres",
].map((category) => ({
  title: category,

  skills: skillList
    .filter(
      (skill) =>
        (skillCategories[skill] ?? "Autres") ===
        category,
    )
    .sort(),
}));

/**
 * Liste automatique des compétences transversales
 */
export const softSkillList = [
  ...new Set(
    periods.flatMap((group) =>
      group.items.flatMap(
        (experience) => experience.softSkills ?? [],
      ),
    ),
  ),
].sort();

/**
 * Langues
 */
export const languages: Language[] = [
  {
    name: "Français",
    level: "Langue maternelle",
  },

  {
    name: "Anglais",
    level: "Professionnel",
  },
];

/**
 * Centres d'intérêt
 */
export const interests: Interest[] = [
  {
    title: "Musique",
    description:
      "Tubiste au sein de l'Harmonie d'Aire-sur-la-Lys depuis septembre 2010. Batterie et guitare en autodidacte.",
  },

  {
    title: "Sport",
    description:
      "Course à pied, randonnée, escalade, fléchettes.",
  },

  {
    title: "Loisirs",
    description:
      "Échecs, jeux de société, lecture.",
  },
];

/**
 * Informations complémentaires
 */
export const additionalInfo: AdditionalInfo[] = [
  {
    title: "Permis",
    description: "Permis B et A2",
  },

  {
    title: "Mobilité",
    description: "Véhiculé",
  },
];