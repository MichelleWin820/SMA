export type Protein = {
  readonly uniProtId: string;
  readonly accession: string;
  readonly geneId: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly length?: number | null;
  readonly sequence?: string | null;
  readonly species?: string | null;
  readonly isEnzyme?: boolean | null;
  readonly geneName?: string | null;
  readonly domainName?: string | null;
  readonly domainId?: string | null;
  readonly methodId?: string | null;
  readonly pubMedId?: string | readonly string[] | null;
  readonly organelleId?: string | null;
  readonly reactionId?: string | null;
  readonly reactionName?: string | null;
  readonly reactionECNumber?: string | null;
  readonly reactionMetaDomain?: string | null;
  readonly pathwayId?: string | null;
  readonly pathwayName?: string | null;
  readonly geneAliases?: string | null;
  readonly proteinAliases?: string | null;
};
