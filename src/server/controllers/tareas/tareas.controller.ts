import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TareasService } from '../../services/tareas/tareas.service';
import { CreateTareaDto } from '../../dtos/tareas/create-tarea.dto';
import { UpdateTareaDto } from '../../dtos/tareas/update-tarea.dto';
import { TareaModel } from 'src/server/models/tareas/tarea.model';

@Controller('tareas')
export class TareasController {

  constructor(
    private readonly tareasService: TareasService
  ) {}

  @Post()
  create(@Body() createTareaDto: CreateTareaDto) {
    return this.tareasService.create(createTareaDto);
  }

  @Get()
  findAll() {
    return this.tareasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tareasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTareaDto: TareaModel) {
    return this.tareasService.update(id, updateTareaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tareasService.remove(id);
  }
}
