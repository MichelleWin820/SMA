export type Paper = {
  readonly id: string;
  readonly title?: string | null;
  readonly journal?: string | null;
  readonly pages?: string | null;
  readonly issn?: string | null;
  readonly essn?: string | null;
  readonly volume?: number | null;
  readonly issue?: number | null;
  readonly pubDate?: Date | string | null;
};
