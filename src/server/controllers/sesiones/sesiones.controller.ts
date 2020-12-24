import { Controller, Get, Post, Body, Put, Param, Delete, Query, Req } from '@nestjs/common';
import { SesionesService } from '../../services/sesiones/sesiones.service';
import { CreateSesioneDto } from '../../dtos/sesiones/create-sesione.dto';
import { UpdateSesioneDto } from '../../dtos/sesiones/update-sesione.dto';
import { SesionesEntity } from 'src/server/models/sesiones/entities/sesione.entity';

@Controller('sesiones')
export class SesionesController {
  constructor(private readonly sesionesService: SesionesService) {}

  @Post()
  create(@Body() body) {
    try {
      // retornando el objeto...
      return this.sesionesService.create(body.usuario, body.sesion);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll(@Query() query) {
    try {
      // recogemos el parámetro del usuario...
      const { usuario } = query;
      // retornamos el resultado...
      return this.sesionesService.findAll(usuario);      
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sesionesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSesioneDto: UpdateSesioneDto) {
    return this.sesionesService.update(id, updateSesioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sesionesService.remove(id);
  }
  
}
