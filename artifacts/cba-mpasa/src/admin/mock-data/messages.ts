import type { Message } from "../types";

export const SEED_MESSAGES: Message[] = [
  {
    id: "m1",
    name: "Grâce Mukendi",
    email: "grace.mukendi@example.com",
    subject: "Première visite",
    message:
      "Bonjour, j'aimerais venir au culte ce dimanche. À quelle heure puis-je arriver et comment trouver l'église ?",
    receivedAt: "2026-04-29T08:14:00Z",
    read: false,
    replied: false,
  },
  {
    id: "m2",
    name: "Patrick Kabongo",
    email: "patrick.kabongo@example.com",
    subject: "Demande de prière",
    message:
      "Merci de prier pour ma famille et mon emploi. Je traverse une période difficile et j'ai besoin de soutien spirituel.",
    receivedAt: "2026-04-28T19:02:00Z",
    read: false,
    replied: false,
  },
  {
    id: "m3",
    name: "Esther Lutumba",
    email: "esther.lutumba@example.com",
    subject: "Rejoindre une structure",
    message:
      "Je voudrais intégrer la chorale des Mamans Deborah. Quelles sont les conditions et les horaires de répétition ?",
    receivedAt: "2026-04-26T11:40:00Z",
    read: true,
    replied: true,
  },
  {
    id: "m4",
    name: "Samuel Banza",
    email: "samuel.banza@example.com",
    subject: "Baptême",
    message:
      "Je souhaite me faire baptiser. Comment puis-je m'inscrire pour la prochaine session de baptême ?",
    receivedAt: "2026-04-25T14:22:00Z",
    read: true,
    replied: false,
  },
  {
    id: "m5",
    name: "Marie-Claire Ngoy",
    email: "marieclaire@example.com",
    subject: "Mariage chrétien",
    message:
      "Mon fiancé et moi souhaitons célébrer notre mariage à l'église CBA. Pourriez-vous nous donner les informations nécessaires ?",
    receivedAt: "2026-04-24T09:05:00Z",
    read: false,
    replied: false,
  },
  {
    id: "m6",
    name: "Daniel Tshilombo",
    email: "daniel.tshilo@example.com",
    subject: "Don pour la construction",
    message:
      "Je voudrais faire un don pour le projet de construction du nouveau temple. Comment puis-je procéder ?",
    receivedAt: "2026-04-22T16:33:00Z",
    read: true,
    replied: true,
  },
];
