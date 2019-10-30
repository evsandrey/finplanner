import { RangedCashFlow } from "../../interfaces/RangedCashFlow";

export class Asset implements RangedCashFlow {
    
    
    flowRange: import("../utils/Range").Range;    getFlowForMonth(): number {
        throw new Error("Method not implemented.");
    }
    getFlow(date: Date): number {
        throw new Error("Method not implemented.");
    }


}