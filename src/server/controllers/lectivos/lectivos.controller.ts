import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { LectivosService } from '../../services/lectivos/lectivos.service';
import { CreateLectivoDto } from '../../dtos/lectivos/create-lectivo.dto';
import { UpdateLectivoDto } from '../../dtos/lectivos/update-lectivo.dto';

@Controller('lectivos')
export class LectivosController {
  constructor(private readonly lectivosService: LectivosService) {}

  @Post()
  create(@Body() createLectivoDto: CreateLectivoDto) {
    return this.lectivosService.create(createLectivoDto);
  }

  @Get()
  findAll() {
    return this.lectivosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lectivosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLectivoDto: UpdateLectivoDto) {
    return this.lectivosService.update(+id, updateLectivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lectivosService.remove(+id);
  }
}
