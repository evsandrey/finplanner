export interface UserRegisterRq {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginRq {
  email: string;
  password: string;
}

export interface UserRs {
  csrf: string;
  jwt: string;
  user: UserProfileRs;
}

export interface UserProfileRs {
  id: string;
  username: string;
  email: string;
  role: Role;
}

export type Role = "user"| "manager" | "admin";
