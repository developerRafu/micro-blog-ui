export interface Post{
    id: number;
    title: string;
    content: string;
    data: Date;
    edited: boolean;
    tags: string[]
}