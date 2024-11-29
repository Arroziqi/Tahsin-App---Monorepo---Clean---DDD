import { Inject, Injectable, Logger } from '@nestjs/common';
import { DayEntity } from '../../entities/day.entity';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState, DataFailed } from 'src/core/resources/data.state';
import { DAY_REPO_TOKEN } from 'src/core/const/provider.token';
import { DayRepository } from '../../repository/day.repository';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';

@Injectable()
export class AddDayUsecase implements UseCase<DayEntity, DataState<DayEntity>> {
  private readonly logger = new Logger(AddDayUsecase.name);

  constructor(
    @Inject(DAY_REPO_TOKEN) private readonly dayRepository: DayRepository,
  ) {}

  async execute(input: DayEntity): Promise<DataState<DayEntity>> {
    const existingDay = await this.dayRepository.findByName(input.name, true);

    this.logger.debug(
      `Checking day name existence: ${input.name}`,
      JSON.stringify(existingDay, null, 2),
    );

    if (existingDay.data && existingDay.data.id) {
      this.logger.warn(`Create day attempt with existing name: ${input.name}`);
      throw new DataFailed<DayEntity>(
        new ErrorEntity(409, 'Day already exists'),
      );
    }

    const result = await this.dayRepository.create(input);
    this.logger.log(`New day created with name: ${input.name}`);

    return result;
  }
}
