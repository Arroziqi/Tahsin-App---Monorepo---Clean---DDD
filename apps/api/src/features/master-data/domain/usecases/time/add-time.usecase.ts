import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { TimeEntity } from '../../entities/time.entity';
import { DataState } from 'src/core/resources/data.state';
import { TIME_REPO_TOKEN } from 'src/core/const/provider.token';
import { TimeRepository } from '../../repository/time.repository';

@Injectable()
export class AddTimeUsecase
  implements UseCase<TimeEntity, DataState<TimeEntity>>
{
  private readonly logger = new Logger(AddTimeUsecase.name);

  constructor(
    @Inject(TIME_REPO_TOKEN) private readonly timeRepository: TimeRepository,
  ) {}

  async execute(input: TimeEntity): Promise<DataState<TimeEntity>> {
    this.logger.debug(`Checking time name existence: ${input.time}`);
    const existingTime = await this.timeRepository.findByName(input.time, true);

    if (existingTime.data && existingTime.data.id) {
      this.logger.warn(`Time already exists`);
      throw new ConflictException('Time already exists');
    }

    const result = await this.timeRepository.create(input);
    this.logger.log(`New time created with name: ${input.time}`);

    return result;
  }
}
