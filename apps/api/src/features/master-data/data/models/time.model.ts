export class TimeModel {
  id: number;
  time: string;
  status: boolean;

  constructor(data: Partial<TimeModel>) {
    Object.assign(this, data);
  }
}
