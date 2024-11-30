import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { TIME_REPO_TOKEN } from 'src/core/const/provider.token';
import { TimeRepository } from '../../repository/time.repository';

@Injectable()
export class DeleteTimeUsecase implements UseCase<number, DataState<string>> {
  private readonly logger = new Logger(DeleteTimeUsecase.name);

  constructor(
    @Inject(TIME_REPO_TOKEN) private readonly timeRepository: TimeRepository,
  ) {}

  async execute(input: number): Promise<DataState<string>> {
    this.logger.debug(`Checking if time exists with id: ${input}`);
    const existingTime = await this.timeRepository.findById(input, true);

    if (!existingTime.data) {
      this.logger.warn(`Time with id: ${input} not found`);
      throw new NotFoundException('Time not found');
    }

    this.logger.debug(`Deleting time with id: ${input}`);
    const result = await this.timeRepository.delete(input);

    this.logger.log(`Successfully deleted time with id: ${input}`);
    return result;
  }
}
