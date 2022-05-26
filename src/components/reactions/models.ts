export type Reaction = {
  readonly id: string;
  readonly name: string;
  readonly ecNumber?: string | null;
  readonly metaDomain?: string | null;
};

export type RxnPrnPwy = {
  readonly reactionId: string;
  readonly proteinId?: string | null;
  readonly pathwayId?: string | null;
};
