import { Inject, Injectable, Logger } from '@nestjs/common';
import { DataState, DataFailed } from 'src/core/resources/data.state';
import { EventEntity } from '../../entities/event.entity';
import { UseCase } from "src/core/domain/usecases/usecase";
import { EVENT_REPO_TOKEN } from 'src/core/const/provider.token';
import { EventRepository } from '../../repository/event.repository';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';

@Injectable()
export class AddEventUsecase implements UseCase<EventEntity, DataState<EventEntity>> {
  private readonly logger = new Logger(AddEventUsecase.name);

  constructor(
    @Inject(EVENT_REPO_TOKEN) private readonly eventRepository: EventRepository,
  ) {}

  async execute(input: EventEntity): Promise<DataState<EventEntity>> {
    const existingEvent = await this.eventRepository.findByName(
      input.name,
      true,
    );

    this.logger.debug(
      `Checking event name existence: ${input.name}`,
      JSON.stringify(existingEvent, null, 2),
    );

    if (existingEvent.data && existingEvent.data.id) {
      this.logger.warn(
        `Create event attempt with existing name: ${input.name}`,
      );
      throw new DataFailed<EventEntity>(
        new ErrorEntity(409, 'Event already exists'),
      );
    }

    const result = await this.eventRepository.create(input);
    this.logger.log(`New event created with name: ${input.name}`);

    return result;
  }
}
