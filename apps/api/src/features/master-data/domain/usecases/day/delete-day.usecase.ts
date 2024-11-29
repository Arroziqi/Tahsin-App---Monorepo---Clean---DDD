import { Inject, Injectable, Logger } from '@nestjs/common';
import { DataState } from 'src/core/resources/data.state';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DAY_REPO_TOKEN } from 'src/core/const/provider.token';
import { DayRepository } from '../../repository/day.repository';

@Injectable()
export class DeleteDayUsecase implements UseCase<number, DataState<string>> {
  private readonly logger = new Logger(DeleteDayUsecase.name);

  constructor(
    @Inject(DAY_REPO_TOKEN) private readonly dayRepository: DayRepository,
  ) {}

  async execute(input: number): Promise<DataState<string>> {
    this.logger.debug(`Deleting day with id: ${input}`);
    const result = await this.dayRepository.delete(input);

    this.logger.log(`Successfully deleted day with id: ${input}`);
    return result;
  }
}
