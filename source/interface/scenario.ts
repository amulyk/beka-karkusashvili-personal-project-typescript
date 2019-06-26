export interface Scenario {
    index: number;
    meta: {
        title: string;
        description: string
    };
    call: (store: {}) => void;
    restore?: () => void;
    silent?: boolean;
}
