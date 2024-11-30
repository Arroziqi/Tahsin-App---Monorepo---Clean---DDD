import {
  DataFailed,
  DataState,
  DataSuccess,
} from 'src/core/resources/data.state';
import { TimeModel } from 'src/features/master-data/data/models/time.model';
import { Injectable, Logger } from '@nestjs/common';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';
import { PrismaService } from 'src/common/services/prisma.service';

export interface TimePrismaDatasources {
  findById(
    id: number,
    includeSchedule?: boolean,
  ): Promise<DataState<TimeModel>>;

  findByName(
    name: string,
    includeSchedule?: boolean,
  ): Promise<DataState<TimeModel>>;

  findAll(includeSchedule?: boolean): Promise<DataState<TimeModel[]>>;

  create(time: TimeModel): Promise<DataState<TimeModel>>;

  update(time: TimeModel): Promise<DataState<TimeModel>>;

  delete(id: number): Promise<DataState<string>>;
}

@Injectable()
export class TimePrismaDataSourcesImpl implements TimePrismaDatasources {
  private readonly logger: Logger = new Logger(TimePrismaDataSourcesImpl.name);

  constructor(private readonly prismaService: PrismaService) {}

  async findById(
    id: number,
    includeSchedule?: boolean,
  ): Promise<DataState<TimeModel>> {
    try {
      this.logger.log(`Finding time with id: ${id}`);
      const data = await this.prismaService.time.findFirst({
        where: { id },
        include: {
          schedules: includeSchedule,
        },
      });

      if (!data) {
        this.logger.warn(`Time with id: ${id} not found`);
        throw new ErrorEntity(404, 'Time not found');
      }

      this.logger.log(`Successfully find time with id: ${id}`);
      return new DataSuccess(new TimeModel(data));
    } catch (error) {
      this.logger.error(`Error finding time with id ${id}: ${error.message}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findByName(
    name: string,
    includeSchedule?: boolean,
  ): Promise<DataState<TimeModel>> {
    try {
      this.logger.log(`Finding time with name: ${name}`);
      const data = await this.prismaService.time.findFirst({
        where: { time: name },
        include: {
          schedules: includeSchedule,
        },
      });

      if (!data) {
        this.logger.warn(`Time with name: ${name} not found`);
        return new DataFailed(new ErrorEntity(404, 'Time not found'));
      }

      this.logger.log(`Successfully found time with name: ${name}`);
      return new DataSuccess(new TimeModel(data));
    } catch (error) {
      this.logger.error(`Error finding time with name: ${name}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async findAll(includeSchedule?: boolean): Promise<DataState<TimeModel[]>> {
    try {
      this.logger.log('Finding all times');
      const data = await this.prismaService.time.findMany({
        include: {
          schedules: includeSchedule,
        },
        orderBy: {
          id: 'asc',
        },
      });

      if (!data || data.length === 0) {
        this.logger.warn(`No levels found`);
        throw new ErrorEntity(404, 'Time not found');
      }

      this.logger.log(`Successfully found all times`);
      return new DataSuccess(data.map((time) => new TimeModel(time)));
    } catch (error) {
      this.logger.error(`Error finding all times: ${error.message}`);
      throw new ErrorEntity(error.statusCode, error.message);
    }
  }

  async create(time: TimeModel): Promise<DataState<TimeModel>> {
    try {
      this.logger.log(`Creating time`);
      const data = await this.prismaService.time.create({
        data: time,
      });

      this.logger.log(`Successfully created time`);
      return new DataSuccess(new TimeModel(data));
    } catch (e) {
      this.logger.error(`Error creating time: ${e}`);
      throw new ErrorEntity(500, e.message);
    }
  }

  async update(time: TimeModel): Promise<DataState<TimeModel>> {
    try {
      this.logger.log(`Updating time with id: ${time.id}`);
      const data = await this.prismaService.time.update({
        where: { id: time.id },
        data: time,
      });

      this.logger.log(`Successfully updated time with id: ${time.id}`);
      return new DataSuccess(new TimeModel(data));
    } catch (e) {
      this.logger.error(`Error updating time with id: ${time.id}`);
      throw new ErrorEntity(500, e.message);
    }
  }

  async delete(id: number): Promise<DataState<string>> {
    try {
      this.logger.log(`Deleting level with id: ${id}`);
      await this.prismaService.time.delete({
        where: { id },
      });

      this.logger.log(`Successfully deleted level with id: ${id}`);
      return new DataSuccess('OK');
    } catch (e) {
      this.logger.error(`Error deleteing time with id: ${id}`);
      throw new ErrorEntity(500, e.message);
    }
  }
}
