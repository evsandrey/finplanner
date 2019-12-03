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
  id: string | number;
  username: string;
  email: string;
  role: Role;
  avatar_url: string | undefined;
  avatar: string | Blob | undefined;
}

export type Role = "user" | "manager" | "admin";
