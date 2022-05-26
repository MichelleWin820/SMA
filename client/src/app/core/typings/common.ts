export type StringTMap<T> = { [key: string]: T };
export type NumberTMap<T> = { [key: number]: T };

export type StringAnyMap = StringTMap<any>;
export type NumberAnyMap = NumberTMap<any>;

export type StringStringMap = StringTMap<string>;
export type NumberStringMap = NumberTMap<string>;

export type StringNumberMap = StringTMap<number>;
export type NumberNumberMap = NumberTMap<number>;

export type StringBooleanMap = StringTMap<boolean>;
export type NumberBooleanMap = NumberTMap<boolean>;

export type StronglyKeyedMap<T extends string | number, V> = { [k in T]: V };

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PickRequired<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>;

export type AppError = {
  readonly status: number;
  readonly message: string;
  readonly details?: any;
  readonly code?: string;
  readonly name?: string;
  readonly stack?: string;
};

export type ListRequest = {
  search?: string;
  sort?: string;
  skip?: number;
  limit?: number;
};
