import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateRoleUsecase } from "../../domain/usecases/role/create.usecase";
import { RoleModel } from "../../data/models/role.model";
import { DataState } from "src/core/resources/data.state";
import { GetAllRoleUsecase } from "../../domain/usecases/role/get.all.usecase";
import { UpdateRoleUsecase } from "../../domain/usecases/role/update.usecase";
import { DeleteRoleUsecase } from "../../domain/usecases/role/delete.usecase";

@Controller('/api/roles')
export class RoleController {
  constructor(private readonly createRoleUsecase: CreateRoleUsecase, private readonly getAllRoleUsecase: GetAllRoleUsecase, private readonly updateRoleUsecase: UpdateRoleUsecase, private readonly deleteRoleUsecase: DeleteRoleUsecase) { }

  @Get()
  async getRoles(): Promise<DataState<RoleModel[]>> {
    return await this.getAllRoleUsecase.execute();
  }

  @Post('/create')
  async createRole(@Body() request: RoleModel): Promise<DataState<RoleModel>> {
    try {
      return await this.createRoleUsecase.execute(request);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('/update/:id')
  async updateRole(@Body() request: RoleModel, @Param('id', ParseIntPipe) id: number): Promise<DataState<RoleModel>> {
    try {
      return await this.updateRoleUsecase.execute({
        id: id,
        name: request.name,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/delete/:id')
  async deleteRole(@Param('id', ParseIntPipe) id: number): Promise<DataState<String>> {
    try {
      await this.deleteRoleUsecase.execute(id);

      return {
        data: "OK",
        error: null,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
