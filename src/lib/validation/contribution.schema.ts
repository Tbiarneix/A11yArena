import { z } from "zod";
import { challengeSchema } from "./challenge.schema";

export const contributionSubmitSchema = z.object({
  challengeSnapshot: challengeSchema,
  challengeId: z.string().uuid().optional(),
});

export const reviewSchema = z.object({
  action: z.enum(["approve", "request_changes", "reject", "comment"]),
  comment: z.string().min(1).max(2000).optional(),
  inlineComments: z
    .array(
      z.object({
        section: z.enum(["instructions", "starterCode", "tests", "debrief"]),
        path: z.string().optional(),
        line: z.number().int().optional(),
        comment: z.string().min(1),
      })
    )
    .optional(),
});

export type ContributionSubmitInput = z.infer<typeof contributionSubmitSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
