import CashFlow from "./CashFlow";
import { Range } from "../models/utils/Range"

export interface RangedCashFlow extends CashFlow {
    flowRange: Range;
    getFlowForMonth() : number;
}