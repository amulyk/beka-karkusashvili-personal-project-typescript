export interface Log {
    index: number,
    meta: {
        title: string,
        description: string
    }
    storeBefore?: {},
    storeAfter?: {},
    error?: null | { name:string, message:string, stack:string }
}