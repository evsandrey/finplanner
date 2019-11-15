import { Cash } from '../basic/Cash';

export interface Transaction{
    from: Cash;
    to: Cash;
    amount: number;
}