export class LevelModel {
  id: number;
  name: string;
  // classes?: ClassModel[];

  constructor(data: Partial<LevelModel>) {
    Object.assign(this, data);
  }
}
