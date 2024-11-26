export class LevelEntity {
  id: number;
  name: string;
  // classes?: ClassEntity[];

  constructor(data: Partial<LevelEntity>) {
    Object.assign(this, data);
  }
}
