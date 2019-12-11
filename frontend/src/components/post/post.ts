import { User, UserHelper } from "../user/User";
import { UserProfileRs } from "@/store/modules/user";

export class Post {
  id: string | number;
  title: string;
  text: string;
  user_id: string | number | undefined;
  user: User | undefined;

  constructor(postRs: PostRs) {
    this.id = postRs.id;
    this.title = postRs.title;
    this.text = postRs.text;
    this.user_id = postRs.user_id;
    this.user = new User(postRs.user);
  }

  asSavePostRq(): SavePostRq {
    return {
      title: this.title,
      text: this.text
    };
  }
  public setTitle(title: string): void {
    this.title = title;
  }

  public setText(text: string): void {
    this.text = text;
  }
}

export namespace PostHelper {
  export function getNew() {
    return new Post({
      id: 0,
      title: "",
      text: "",
      user_id: "0",
      user: UserHelper.getNewRs()
    });
  }
  export function fromRespArray(postRsArr: PostRs[]): Post[] {
    let postArr: Post[] = [];
    postRsArr.forEach(postRs => {
      postArr.push(new Post(postRs));
    });
    return postArr;
  }
}

export interface SavePostRq {
  title: string;
  text: string;
}

export interface PostRs {
  id: string | number;
  title: string;
  text: string;
  user_id: string | number;
  user: UserProfileRs;
}
