import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { LectivosService } from '../../services/lectivos/lectivos.service';
import { CreateLectivoDto } from '../../dtos/lectivos/create-lectivo.dto';
import { UpdateLectivoDto } from '../../dtos/lectivos/update-lectivo.dto';
import { LectivoModel } from 'src/server/models/lectivos/lectivo.model';
import { ParcialModel } from 'src/server/models/lectivos/parcial.model';

@Controller('lectivos')
export class LectivosController {
  
  constructor(private readonly lectivosService: LectivosService) {}

  @Post()
  public async create(@Body() createLectivoDto: LectivoModel) {
    try {
      return await this.lectivosService.create(createLectivoDto);      
    } catch (error) {
      throw error;
    }
  }

  @Get()
  public async findAll() {
    return await this.lectivosService.findAll();
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

  @Post('/parciales')
  public async createParcial(@Body() createLectivoDto: LectivoModel) {
    try {
      return await this.lectivosService.createParcial(createLectivoDto);
    } catch (error) {
      throw error;
    }
  }
   
  @Put('/parciales/:id')
  async updateParcial(@Param('id') id: string, @Body() parcialModel: ParcialModel) {
    return await this.lectivosService.updateParcial(id, parcialModel);
  }

}
