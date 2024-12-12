export class BankAccountEntity {
  id: number;
  accountName: string;
  accountNumber: number;
  bankName: string;

  constructor(data: Partial<BankAccountEntity>) {
    Object.assign(this, data);
  }
}
