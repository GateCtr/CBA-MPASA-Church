import type { PrayerRequest } from "../types";

export const SEED_PRAYERS: PrayerRequest[] = [
  {
    id: "pr1",
    name: "Anonyme",
    anonymous: true,
    request:
      "Je demande la prière pour ma guérison. Je souffre depuis plusieurs mois et les médecins n'ont pas encore trouvé la cause.",
    category: "sante",
    receivedAt: "2026-04-29T07:30:00Z",
    status: "en_attente",
    notes: "",
  },
  {
    id: "pr2",
    name: "Grâce K.",
    anonymous: false,
    request:
      "Prière pour la réconciliation dans ma famille. Mon mari et moi traversons une période difficile et nous avons besoin de la sagesse de Dieu.",
    category: "famille",
    receivedAt: "2026-04-28T15:20:00Z",
    status: "prie",
    notes: "Suivi pastoral en cours",
  },
  {
    id: "pr3",
    name: "Anonyme",
    anonymous: true,
    request:
      "Je cherche un emploi depuis 8 mois. Je demande à l'assemblée de prier pour que Dieu ouvre des portes dans ma vie professionnelle.",
    category: "travail",
    receivedAt: "2026-04-27T12:00:00Z",
    status: "prie",
    notes: "",
  },
  {
    id: "pr4",
    name: "Jean-Paul M.",
    anonymous: false,
    request:
      "Prière pour mon enfant qui a des difficultés à l'école. Qu'il soit entouré de bons amis et que Dieu bénisse ses études.",
    category: "famille",
    receivedAt: "2026-04-26T09:45:00Z",
    status: "en_attente",
    notes: "",
  },
  {
    id: "pr5",
    name: "Marie T.",
    anonymous: false,
    request:
      "Je veux rededier ma vie à Dieu. Je me suis éloignée pendant des années et je veux revenir. Priez pour que je reste ferme dans ma décision.",
    category: "spirituel",
    receivedAt: "2026-04-25T18:10:00Z",
    status: "repondu",
    notes: "Rencontre pastorale réalisée le 27/04",
  },
  {
    id: "pr6",
    name: "Anonyme",
    anonymous: true,
    request: "Prière pour mon visa et mes démarches administratives.",
    category: "autre",
    receivedAt: "2026-04-24T10:30:00Z",
    status: "en_attente",
    notes: "",
  },
  {
    id: "pr7",
    name: "Samuel B.",
    anonymous: false,
    request:
      "Guérison de mon père hospitalisé depuis une semaine. Les médecins sont inquiets. Je crois en la puissance de la prière collective.",
    category: "sante",
    receivedAt: "2026-04-23T20:05:00Z",
    status: "prie",
    notes: "Visite pastorale à l'hôpital prévue",
  },
];
