export interface Scenario {
    index: number;
    meta: {
        title: string;
        description: string
    };
    call: <T>(store: T ) => void;
    restore?: () => void;
    silent?: boolean;
}
