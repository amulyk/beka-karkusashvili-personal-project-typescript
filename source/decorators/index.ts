import { Log } from "../interface/index";

export const logs = <T extends {new(...args: any[]): {}}>(constructor: T) => {
    return class extends constructor {
        private logs: Log[];
    };
};
