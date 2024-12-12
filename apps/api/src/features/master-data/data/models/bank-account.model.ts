export class BankAccountModel {
  id: number;
  accountName: string;
  accountNumber: number;
  bankName: string;

  constructor(data: Partial<BankAccountModel>) {
    Object.assign(this, data);
  }
}
