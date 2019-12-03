import { UserProfileRs, Role } from "@/store/modules/user";

export namespace UserHelper{
  export function getNewRs():UserProfileRs {
    return {
      id: "string",
      username: "string",
      email: "string",
      role: "user",
      avatar_url: undefined,
      avatar: undefined
    } as UserProfileRs; 
  }
}



export class User {
  id: string | number;
  username: string;
  email: string;
  avatar: string | Blob | undefined;
  avatar_url: string | undefined;
  role: Role;
  constructor(userRs: UserProfileRs) {
    this.id = userRs.id;
    this.username = userRs.username;
    this.email = userRs.email;
    this.role = userRs.role;
    this.avatar = userRs.avatar;
    this.avatar_url = userRs.avatar_url;
  }

  hasAvatar(): boolean {
    return this.getAvatarUrl() ? true : false;
  }

  getAvatarUrl(): string | undefined {
    if (this.avatar) {
      return URL.createObjectURL(this.avatar);
    } else if (this.avatar_url) {
      return this.avatar_url;
    } else {
      return undefined;
    }
  }

  setUsername(username: string) {
    this.username = username;
  }
  setAvatar(avatar: Blob) {
    this.avatar = avatar;
  }
  clone(): User {
    let profile: UserProfileRs = {
      id: this.id,
      username: this.username,
      email: this.email,
      avatar: this.avatar,
      avatar_url: this.avatar_url,
      role: this.role
    } as UserProfileRs;
    return new User(profile);
  }
}
