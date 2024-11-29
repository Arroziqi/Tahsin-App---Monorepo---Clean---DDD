import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { AddTimeSchema } from '../../presentation/dto/time/add-time.dto';

@Injectable()
export class CreateTimePipe implements PipeTransform {
  private readonly logger = new Logger(CreateTimePipe.name);

  async transform(value: any, metadata: ArgumentMetadata) {
    this.logger.log(`Starting request validation`);

    const result = AddTimeSchema.safeParse(value);

    if (!result.success) {
      this.logger.error(
        `Request validation failed: ${JSON.stringify(result.error.errors)}`,
      );
      throw new BadRequestException(result.error.errors);
    }

    this.logger.log(`Request validation successful`);
    return result.data;
  }
}
