import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { LectivosTareasService } from '../../services/lectivos-tareas/lectivos.tareas.service';
import { CreateLectivosTareaDto } from '../../dtos/lectivos-tareas/create-lectivos-tarea.dto';
import { UpdateLectivosTareaDto } from '../../dtos/lectivos-tareas/update-lectivos-tarea.dto';

@Controller('lectivostareas')
export class LectivosTareasController {

  constructor(private readonly lectivosTareasService: LectivosTareasService) {}

  @Post()
  create(@Body() createLectivosTareaDto: CreateLectivosTareaDto) {
    return this.lectivosTareasService.create(createLectivosTareaDto);
  }

  @Post('representantes')
  registraRepresentatesSesion(@Body() body) {
    try {
      const { representanteId, tareaId } = body;
      // return...
      return this.lectivosTareasService.registraRepresentanteTarea(representanteId, tareaId);      
    } catch (error) {
      return error;
    }
  }

  @Get('representantes/lista')
  retornaListaRepresentantesSesion(@Query() query) {
    try {
      const { tareaId } = query;
      // return...
      return this.lectivosTareasService.retornaListaRepresentantesTareas(tareaId);
    } catch (error) {
      return error;
    }
  }

  @Get()
  findAll() {
    return this.lectivosTareasService.findAll();
  }

  @Get('representantes')
  retornaRepresentatesSesion(@Query() query) {
    try {
      const { id } = query;
      // return...
      return this.lectivosTareasService.retornaParticipantesTarea(id);      
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lectivosTareasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLectivosTareaDto: UpdateLectivosTareaDto) {
    return this.lectivosTareasService.update(+id, updateLectivosTareaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lectivosTareasService.remove(+id);
  }
}
