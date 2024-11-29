import { DataState } from 'src/core/resources/data.state';
import { TimeEntity } from 'src/features/master-data/domain/entities/time.entity';

export interface TimeRepository {
  findById(
    id: number,
    includeSchedule?: boolean,
  ): Promise<DataState<TimeEntity>>;

  findByName(
    name: string,
    includeSchedule?: boolean,
  ): Promise<DataState<TimeEntity>>;

  findAll(includeUser?: boolean): Promise<DataState<TimeEntity[]>>;

  create(time: TimeEntity): Promise<DataState<TimeEntity>>;

  update(time: TimeEntity): Promise<DataState<TimeEntity>>;

  delete(id: number): Promise<DataState<string>>;
}
