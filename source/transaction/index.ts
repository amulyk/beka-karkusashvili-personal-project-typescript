import { logs } from "../decorators/index";
import { Log, Scenario } from "../interface/index";

@logs
export class Transaction<T> {

    public logs: Log[];

    public store: T | null;

    public async dispatch(scenario: Scenario[]) {

        scenario.forEach((item) => {
            const { index } = item;
            if (index < 1) {
                throw new Error("Index must more than or equal 1.");
            }

        });
        const steps = scenario.sort((a, b) => a.index - b.index);
        if (steps[steps.length - 1].hasOwnProperty("restore")) {
            throw new Error("Last step does'n have restor method.");
        }
        let stepCount = -1;

        for (const step of steps) {
            const { index, meta, call, silent } = step;

            const log: Log = { index, meta, error: null };
            const storeBefore = {...this.store};

            try {
                if (this.store === null) {
                    throw new Error("Store is empty");
                }
                await call(this.store);
                log.storeBefore = storeBefore;
                log.storeAfter = {...this.store};
            } catch ({name, message, stack}) {
                log.error = { name, message, stack };

                if (silent !== true) {
                    this.logs.push(log);
                    this.store = null;
                    for (let i = stepCount; i >= 0; i--) {
                        const { restore } = steps[i];
                        if (typeof restore !== "function") {
                            continue;
                        }
                        try {
                            await restore();
                        } catch (err) {
                            throw err;
                        }
                    }
                    break;
                }
            }
            stepCount++;
            this.logs.push(log);
        }

    }

}
