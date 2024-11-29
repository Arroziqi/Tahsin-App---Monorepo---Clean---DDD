import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { AddEventSchema } from '../../presentation/dto/event/add-event.dto';

@Injectable()
export class CreateEventPipe implements PipeTransform {
  logger: any;
  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const result = AddEventSchema.safeParse(value);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return result.data;
  }
}
