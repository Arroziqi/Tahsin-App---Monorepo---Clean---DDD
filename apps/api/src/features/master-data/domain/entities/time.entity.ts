export class TimeEntity {
  id: number;
  time: string;
  status: boolean;

  constructor(data: Partial<TimeEntity>) {
    Object.assign(this, data);
  }
}
