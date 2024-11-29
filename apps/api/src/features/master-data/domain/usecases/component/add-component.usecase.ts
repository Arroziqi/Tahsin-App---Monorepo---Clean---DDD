import { Inject, Injectable, Logger } from '@nestjs/common';
import { ComponentEntity } from '../../entities/component.entity';
import { UseCase } from 'src/core/domain/usecases/usecase';
import { DataState, DataFailed } from 'src/core/resources/data.state';
import { COMPONENT_REPO_TOKEN } from 'src/core/const/provider.token';
import { ComponentRepository } from '../../repository/component.repository';
import { ErrorEntity } from 'src/core/domain/entities/error.entity';

@Injectable()
export class AddComponentUsecase
  implements UseCase<ComponentEntity, DataState<ComponentEntity>>
{
  private readonly logger = new Logger(AddComponentUsecase.name);

  constructor(
    @Inject(COMPONENT_REPO_TOKEN)
    private readonly componentRepository: ComponentRepository,
  ) {}

  async execute(input: ComponentEntity): Promise<DataState<ComponentEntity>> {
    const existingComponent = await this.componentRepository.findByName(
      input.name,
    );

    this.logger.debug(
      `Checking component name existence: ${input.name}`,
      JSON.stringify(existingComponent, null, 2),
    );

    if (existingComponent.data && existingComponent.data.id) {
      this.logger.warn(
        `Create component attempt with existing name: ${input.name}`,
      );
      throw new DataFailed<ComponentEntity>(
        new ErrorEntity(409, 'Component already exists'),
      );
    }

    const result = await this.componentRepository.create(input);
    this.logger.log(`New component created with name: ${input.name}`);

    return result;
  }
}
