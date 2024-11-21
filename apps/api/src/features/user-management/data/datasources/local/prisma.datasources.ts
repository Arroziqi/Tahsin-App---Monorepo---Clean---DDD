import { DataState } from 'src/core/resources/data.state';
import { UserModel } from '../../models/user.model';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

export interface PrismaDataSources {
  findByEmail(email: string, includeRole?: boolean): Promise<DataState<UserModel>>;
  findById(id: number, includeRole?: boolean): Promise<DataState<UserModel>>;
  create(user: UserModel): Promise<DataState<UserModel>>;
}

@Injectable()
export class PrismaDataSourcesImpl implements PrismaDataSources {
  private readonly logger = new Logger(PrismaDataSourcesImpl.name);
  
  constructor(private prismaService: PrismaService) {}
  
  async findByEmail(
    email: string,
    includeRole?: boolean,
  ): Promise<DataState<UserModel>> {
    try {
      this.logger.debug(`Finding user by email: ${email}`);
      const users = await this.prismaService.user.findFirst({
        where: { email },
        include: { role: includeRole },
      });

      if (!users) {
        this.logger.debug(`No user found with email: ${email}`);
        return { data: null, error: undefined };
      }

      this.logger.debug('User found successfully');
      return {
        data: new UserModel({...users, role: includeRole ? users.role : undefined}),
        error: undefined,
      };
    } catch (error) {
      this.logger.error('Error finding user by email', {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  async findById(id: number, includeRole?: boolean): Promise<DataState<UserModel>> {
    try {
      this.logger.debug(`Finding user by ID: ${id}`);
      const users = await this.prismaService.user.findFirst({
        where: { id },
        include: { role: includeRole },
      });

      if (!users) {
        this.logger.debug(`No user found with ID: ${id}`);
        return { data: null, error: undefined };
      }

      this.logger.debug('User found successfully');
      return {
        data: new UserModel({...users, role: includeRole ? users.role : undefined}),
        error: undefined,
      };
    } catch (error) {
      this.logger.error('Error finding user by ID', {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  async create(user: UserModel): Promise<DataState<UserModel>> {
    try {
      this.logger.debug(`Creating new user with email: ${user.email}`);
      const data = await this.prismaService.user.create({
        data: {
          username: user.username,
          email: user.email,
          password: user.password,
          role_id: user.role_id,
          profile_id: user.profile_id,
        },
      });

      this.logger.debug('User created successfully');
      return {
        data: {
          id: data.id,
          username: data.username,
          email: data.email,
          password: data.password,
          role_id: data.role_id,
          profile_id: data.profile_id,
        },
        error: undefined,
      };
    } catch (error) {
      this.logger.error('Error creating user', {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }
}
