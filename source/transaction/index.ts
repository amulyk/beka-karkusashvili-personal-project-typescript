import { Scenario } from '../validation/index';

interface Log {
    index: number,
    meta: {
        title: string,
        description: string
    }
    storeBefore?: {},
    storeAfter?: {},
    error?: null | { name:string, message:string, stack:string }
}

export class Transaction {

    readonly logs:Log[];
    public store:{};

    public async dispatch(scenario: Scenario[]) {

        scenario.forEach(item => {
            const { index } = item;
            if (index < 1) {
                throw new Error('Index must more than or equal 1.');
            }

        });
        const steps = scenario.sort((a, b) => a.index - b.index);
        if(steps[steps.length-1].hasOwnProperty('restore')) {
            throw new Error('Last step does\'n have restor method.');
        }
        let stepCount = -1;

        for (const step of steps) {
            const { index, meta, call, silent } = step;
            
            const log: Log = { index, meta };
            const storeBefore = {...this.store};
            
            try {
                await call(this.store);
                log.storeBefore = storeBefore;
                log.storeAfter = {...this.store};
                log.error = null;
            } catch ({name, message, stack}) {
                log.error = { name, message, stack };
                
                if (silent !== true) {
                    this.logs.push(log);
                    this.store = null;
                    for (let i = stepCount; i >= 0; i--) {
                        const { restore } = steps[i];
                        if (typeof restore !== 'function') {
                            continue;
                        }
                        try {
                            await restore();
                        } catch(err) {
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
