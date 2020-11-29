import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MateriaModel } from '../../models/materias/materia.model';
import { MateriasService } from '../../services/materias/materias.service';

@Controller('materias')
export class MateriasController {

  constructor(private readonly materiasService: MateriasService) {}

  @Post()
  create(@Body() createMateriaDto: MateriaModel) {
    return this.materiasService.create(createMateriaDto);
  }

  @Get()
  public async findAll() {
    return await this.materiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materiasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMateriaDto: MateriaModel) {
    return this.materiasService.update(+id, updateMateriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materiasService.remove(+id);
  }
  
}
