import { Account } from '../account/account';

export class Transaction {
    id: number;
    type: string;
    amount: string;
    amountsign: string;
    account: Account;
}