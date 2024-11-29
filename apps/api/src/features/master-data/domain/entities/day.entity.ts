export class DayEntity {
  id: number;
  name: string;
  status: boolean;

  constructor(data: Partial<DayEntity>) {
    Object.assign(this, data);
  }
}
