import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  Logger,
} from '@nestjs/common';
import { UpdateTimeSchema } from '../../presentation/dto/time/update-time.dto';

@Injectable()
export class UpdateTimePipe implements PipeTransform {
  private readonly logger = new Logger(UpdateTimePipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.debug('Starting request validation');

    const result = UpdateTimeSchema.safeParse(value);

    if (!result.success) {
      this.logger.error('Request validation failed', result.error.errors);
      throw new BadRequestException(result.error.errors);
    }

    this.logger.debug('Request validation successful');
    return result.data;
  }
}
