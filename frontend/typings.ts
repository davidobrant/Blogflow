export interface Blogpost {
    blogId: number;
    title: string;
    body: string;
    userId: string;
    author: string;
    createdAt: string;
    privacy: boolean;
}

export interface User {
    userId: number;
    username: string;
    email: string;
    roles: string[];
}

