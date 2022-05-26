export type User = {
  readonly email: string;
  readonly name?: string | null;
};

export type SignInReq = {
  readonly username: string;
  readonly password: string;
};

export type SignInRes = {
  readonly user: User;
  readonly sid: string;
};
