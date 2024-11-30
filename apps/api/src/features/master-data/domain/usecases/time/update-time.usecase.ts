import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { TimeEntity } from '../../entities/time.entity';
import { TIME_REPO_TOKEN } from 'src/core/const/provider.token';
import { TimeRepository } from '../../repository/time.repository';

@Injectable()
export class UpdateTimeUsecase
  implements UseCase<TimeEntity, DataState<TimeEntity>>
{
  private readonly logger = new Logger(UpdateTimeUsecase.name);

  constructor(
    @Inject(TIME_REPO_TOKEN) private readonly timeRepository: TimeRepository,
  ) {}

  async execute(input: TimeEntity): Promise<DataState<TimeEntity>> {
    this.logger.debug(`Checking if time exists with id: ${input.id}`);
    const existingTime = await this.timeRepository.findById(input.id, true);

    if (!existingTime.data) {
      this.logger.warn(`Time with id: ${input.id} not found`);
      throw new NotFoundException('Time not found');
    }

    this.logger.debug(`Updating time with id: ${input.id}`);
    const result = await this.timeRepository.update(input);

    this.logger.log(`Successfully updated time with id: ${input.id}`);
    return result;
  }
}
