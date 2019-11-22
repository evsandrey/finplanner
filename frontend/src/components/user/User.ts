import { UserProfileRs,Role } from '@/store/modules/user';

export class User implements UserProfileRs{
    id: string;    
    username: string;
    email: string;
    role: Role;
    constructor(userRs: UserProfileRs) {
        this.id = userRs.id;
        this.username = userRs.username;
        this.email = userRs.email;
        this.role = userRs.role;
    }
    setUsername(username: string) {
        this.username = username;
    }
}