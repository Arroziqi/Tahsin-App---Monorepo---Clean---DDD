import { Inject, Injectable, Logger } from '@nestjs/common';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState } from 'src/core/resources/data.state';
import { COMPONENT_REPO_TOKEN } from 'src/core/const/provider.token';
import { ComponentRepository } from '../../repository/component.repository';

@Injectable()
export class DeleteComponentUsecase
  implements UseCase<number, DataState<string>>
{
  private readonly logger = new Logger(DeleteComponentUsecase.name);

  constructor(
    @Inject(COMPONENT_REPO_TOKEN)
    private readonly componentRepository: ComponentRepository,
  ) {}

  async execute(input: number): Promise<DataState<string>> {
    this.logger.debug(`Deleting component with id: ${input}`);
    const result = await this.componentRepository.delete(input);

    this.logger.log(`Successfully deleted component with id: ${input}`);
    return result;
  }
}
