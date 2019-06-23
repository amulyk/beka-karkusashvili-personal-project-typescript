export interface Scenario {
    [index: number]: {
        index: number,
        meta: {
            title: string,
            description: string
        },
        call: (store: {[key: string]: any} ) => any,
        restore?: () => any,
        silent?: string
    }
}
