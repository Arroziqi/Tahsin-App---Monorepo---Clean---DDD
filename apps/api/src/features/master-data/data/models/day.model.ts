export class DayModel {
  id: number;
  name: string;
  status: boolean;

  constructor(data: Partial<DayModel>) {
    Object.assign(this, data);
  }
}
