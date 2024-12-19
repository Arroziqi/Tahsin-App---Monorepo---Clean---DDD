import { Inject, Injectable } from '@nestjs/common';
import { TimeRepository } from '../../domain/repository/time.repository';
import { DataState } from 'src/core/resources/data.state';
import { TimeEntity } from '../../domain/entities/time.entity';
import { TIME_REPO_TOKEN } from 'src/core/const/provider.token';

@Injectable()
export class TimeRepositoryImpl implements TimeRepository {
  constructor(
    @Inject(TIME_REPO_TOKEN) private readonly timeRepository: TimeRepository,
  ) {}

  async findById(
    id: number,
    includeSchedule?: boolean,
  ): Promise<DataState<TimeEntity>> {
    return await this.timeRepository.findById(id, includeSchedule);
  }

  async findByName(
    name: string,
    includeSchedule?: boolean,
  ): Promise<DataState<TimeEntity>> {
    return await this.timeRepository.findByName(name, includeSchedule);
  }

  async findAll(includeSchedule?: boolean): Promise<DataState<TimeEntity[]>> {
    return await this.timeRepository.findAll(includeSchedule);
  }

  async create(time: TimeEntity): Promise<DataState<TimeEntity>> {
    return await this.timeRepository.create(time);
  }

  async update(time: TimeEntity): Promise<DataState<TimeEntity>> {
    return await this.timeRepository.update(time);
  }

  async delete(id: number): Promise<DataState<string>> {
    return await this.timeRepository.delete(id);
  }
}