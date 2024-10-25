declare namespace NodeJS{
    interface ProcessEnv{
        NODE_ENV: 'development' | 'production' | 'test';
        PORT: string;
        MONGO_URI: string
    }
}


export interface Item{
    name:string;
    description?:string;
    creadtedAt: Date;
    updatedAt: Date;
}