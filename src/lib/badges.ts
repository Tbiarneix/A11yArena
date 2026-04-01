import type { Badge, ChallengeAttempt } from "@/types/user";

export type BadgeType =
  | "first_challenge"
  | "streak_7"
  | "streak_30"
  | "category_master"
  | "perfect_score"
  | "speed_demon"
  | "contributor";

interface BadgeDefinition {
  type: BadgeType;
  label: string;
  description: string;
}

export const BADGE_DEFINITIONS: Record<BadgeType, BadgeDefinition> = {
  first_challenge: {
    type: "first_challenge",
    label: "Premiers pas",
    description: "Compléter son premier challenge",
  },
  streak_7: {
    type: "streak_7",
    label: "Semaine parfaite",
    description: "7 jours consécutifs d'activité",
  },
  streak_30: {
    type: "streak_30",
    label: "Mois parfait",
    description: "30 jours consécutifs d'activité",
  },
  category_master: {
    type: "category_master",
    label: "Maître de catégorie",
    description: "Compléter tous les challenges d'une catégorie",
  },
  perfect_score: {
    type: "perfect_score",
    label: "Score parfait",
    description: "Obtenir 100/100 sur un challenge",
  },
  speed_demon: {
    type: "speed_demon",
    label: "Éclair",
    description: "Compléter un challenge en moins de la moitié du temps estimé",
  },
  contributor: {
    type: "contributor",
    label: "Contributeur",
    description: "Avoir un challenge publié sur la plateforme",
  },
};

export function computeNewBadges(
  attempts: ChallengeAttempt[],
  currentStreak: number,
  existingBadges: Badge[]
): BadgeType[] {
  const existingTypes = new Set(existingBadges.map((b) => b.badgeType as BadgeType));
  const newBadges: BadgeType[] = [];

  const completed = attempts.filter((a) => a.status === "completed");

  if (completed.length >= 1 && !existingTypes.has("first_challenge")) {
    newBadges.push("first_challenge");
  }

  if (currentStreak >= 7 && !existingTypes.has("streak_7")) {
    newBadges.push("streak_7");
  }

  if (currentStreak >= 30 && !existingTypes.has("streak_30")) {
    newBadges.push("streak_30");
  }

  const hasPerfect = completed.some((a) => a.score === 100);
  if (hasPerfect && !existingTypes.has("perfect_score")) {
    newBadges.push("perfect_score");
  }

  return newBadges;
}
