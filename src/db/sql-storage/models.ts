export type QueryResult = {
  rowCount: number;
  rows: any[];
};

export type Query = {
  name?: string;
  text: string;
  values?: any[];
};

export type DbClient = {
  query: (query: Query) => Promise<QueryResult>;
};
