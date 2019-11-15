import { DateRange } from "../utils/time/DateRange";
import { Cash } from '../basic/Cash';
import { CashFlow } from '../basic/CashFlow';

interface Project {
    projects: Project[];
    range: DateRange;
    balance: Cash[];
    input: CashFlow[];
    output: CashFlow[];
}