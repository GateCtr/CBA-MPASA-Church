import type { Announcement } from "../types";

export const SEED_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "a1",
    title: "Conférence MGRN — Inscriptions ouvertes",
    content:
      "Les inscriptions pour la Conférence MGRN du 25 au 27 mai 2026 sont désormais ouvertes. Contactez le secrétariat pour vous inscrire. Places limitées.",
    type: "event",
    publishedAt: "2026-04-25T08:00:00Z",
    expiresAt: "2026-05-25T23:59:00Z",
    visible: true,
  },
  {
    id: "a2",
    title: "Appel à la prière — Semaine d'intercession",
    content:
      "Du 5 au 11 mai 2026, l'assemblée observe une semaine d'intercession nationale. Nous vous invitons à jeûner et prier chaque matin de 6h à 8h au temple.",
    type: "priere",
    publishedAt: "2026-04-28T07:00:00Z",
    expiresAt: "2026-05-11T23:59:00Z",
    visible: true,
  },
  {
    id: "a3",
    title: "Changement d'horaire — Culte de Jeûne",
    content:
      "Le culte de jeûne du mercredi 30 avril est déplacé au jeudi 1er mai à 10h en raison du jour férié. L'entrée principale sera accessible à partir de 9h30.",
    type: "info",
    publishedAt: "2026-04-27T18:00:00Z",
    expiresAt: "2026-05-01T23:59:00Z",
    visible: true,
  },
  {
    id: "a4",
    title: "Urgence — Soutien à la famille Kasongo",
    content:
      "La famille Kasongo a perdu sa maison dans un incendie. L'assemblée organise une collecte d'aide (vêtements, vivres, argent). Contactez le diacre Mwamba.",
    type: "urgent",
    publishedAt: "2026-04-26T10:00:00Z",
    expiresAt: "2026-05-10T23:59:00Z",
    visible: true,
  },
  {
    id: "a5",
    title: "Baptêmes — Session de juin 2026",
    content:
      "La prochaine session de baptême aura lieu le dimanche 21 juin 2026. Les candidats doivent s'inscrire avant le 1er juin auprès du secrétariat. Un cours de préparation sera dispensé.",
    type: "info",
    publishedAt: "2026-04-20T09:00:00Z",
    expiresAt: "2026-06-01T23:59:00Z",
    visible: true,
  },
  {
    id: "a6",
    title: "Collecte de fonds — Nouveau Temple",
    content:
      "La construction du nouveau temple avance bien. Nous avons atteint 65% de notre objectif. Continuez à contribuer selon vos possibilités. Que Dieu bénisse votre générosité.",
    type: "info",
    publishedAt: "2026-04-01T08:00:00Z",
    expiresAt: "2026-12-31T23:59:00Z",
    visible: false,
  },
];
