import { Identifiable } from "./interfaces/Identifiable";
import { FinProject } from "./project/FinProject";
import { Cash } from "./basic/Cash";
import { DateRange } from "./utils/time/DateRange";
import { CashFlow } from "./basic/CashFlow";

// export class Loan implements FinProject, Identifiable {
//     name: string | undefined;
//     id: string | undefined;
//     projects: FinProject[] = [];
//     range: DateRange;
//     balance: Cash[];
//     input: CashFlow[] = [];
//     output: CashFlow[] = [];
//     getBalance(date: Date): Cash {
//         throw new Error("Method not implemented.");
//     }
//     getOut(date: Date): Cash {
//         throw new Error("Method not implemented.");
//     }
//     recalc(): void {
//         throw new Error("Method not implemented.");
//     }

// }
