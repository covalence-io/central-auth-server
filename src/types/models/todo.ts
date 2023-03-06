export interface BaseItem {
    id: string;
    userid: string;
    content: string;
}

export interface Item extends BaseItem {
    completed: boolean;
    created_at: string | Date;
    updated_at: string | Date;
}
