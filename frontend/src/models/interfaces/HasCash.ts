import { Cash } from '../basic/Cash';

export interface HasCash{
    cash: Cash;
    addCash(cash: Cash): void;
    getCash(cash: Cash): void;
}