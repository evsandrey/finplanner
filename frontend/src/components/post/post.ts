export class Post {
    id: string|number|undefined = undefined;
    title: string;
    text: string;
    user_id: string|number|undefined;
    
    constructor(title: string, text: string, user_id: string|number|undefined) {
        this.title = title;
        this.text = text;
        this.user_id = user_id;
    }
    
    public setTitle(title: string): void {
        this.title = title;
    }
    
    public setText(text: string): void {
        this.text = text;
    }
}