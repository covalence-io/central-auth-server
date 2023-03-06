export interface BaseNote {
    id: string;
    userid: string;
    content: string;
}

export interface Note extends BaseNote {
    created_at: string | Date;
    updated_at: string | Date;
}
