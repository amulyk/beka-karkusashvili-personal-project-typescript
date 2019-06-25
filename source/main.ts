import { Scenario } from "./interface/index";
import { Transaction } from "./transaction/index";

const scenario: Scenario[] = [
    {
        call: async (store) => { const fixLint = true; },
        index: 1,
        meta: {
            description: "This action is responsible for reading the most popular customers",
            title: "Title 1",
        },
        restore: async () => { const fixLint = true; },
    },
];

const transaction = new Transaction();

(async () => {
    try {
        await transaction.dispatch(scenario);
        const store = transaction.store; // {} | null
        const logs = transaction.logs; // []
        console.log(logs);
        console.log(store);
    } catch (err) {
        console.log(err);
    }
})();

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));

}
