export type Localization = {
  readonly proteinId: string;
  readonly organelleId: string;
  readonly pubMedId?: string | null;
  readonly method?: string | null;
};

export type LocalizationIdVal = {
  readonly id: string;
  readonly val: string;
};
