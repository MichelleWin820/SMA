export type AuthUser = {
  readonly email: string;
  readonly name?: string;
};

export type SingInReq = {
  readonly username: string;
  readonly password: string;
};
