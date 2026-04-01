export type ContributionStatus =
  | "draft" | "submitted" | "in_review"
  | "changes_requested" | "approved" | "published" | "rejected";

export type ReviewAction = "approve" | "request_changes" | "reject" | "comment";

export interface Contribution {
  id: string;
  challengeId?: string;
  authorId: string;
  status: ContributionStatus;
  version: number;
  challengeSnapshot: Record<string, unknown>;
  submittedAt?: Date;
  resolvedAt?: Date;
}

export interface ContributionReview {
  id: string;
  contributionId: string;
  reviewerId: string;
  action: ReviewAction;
  comment?: string;
  inlineComments?: InlineComment[];
  createdAt: Date;
}

export interface InlineComment {
  section: "instructions" | "starterCode" | "tests" | "debrief";
  path?: string;
  line?: number;
  comment: string;
}
