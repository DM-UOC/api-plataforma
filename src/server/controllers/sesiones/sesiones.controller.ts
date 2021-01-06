import { Controller, Get, Post, Body, Put, Param, Delete, Query, Req } from '@nestjs/common';
import { SesionesService } from '../../services/sesiones/sesiones.service';
import { SesionesModel } from 'src/server/models/sesiones/sesion.model';
import { query } from 'express';

@Controller('sesiones')
export class SesionesController {

  constructor(private readonly sesionesService: SesionesService) {}

  @Post()
  create(@Body() body) {
    try {
      // desestructurando el objeto...
      const { usuario, sesion } = body;
      // retornando el objeto...
      return this.sesionesService.create(usuario, sesion);
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

  @Get('representantes')
  retornaRepresentatesSesion(@Query() query) {
    try {
      const { id } = query;
      // return...
      return this.sesionesService.retornaParticipantesSesion(id);      
    } catch (error) {
      return error;
    }
  }

  @Post('representantes')
  registraRepresentatesSesion(@Body() body) {
    try {
      const { representanteID, sesionID } = body;
      // return...
      return this.sesionesService.registraRepresentanteSesion(representanteID, sesionID);      
    } catch (error) {
      return error;
    }
  }

  @Get('representantes/lista')
  retornaListaRepresentantesSesion(@Query() query) {
    try {
      const { sesionID } = query;
      // return...
      return this.sesionesService.retornaListaRepresentantesSesion(sesionID);
    } catch (error) {
      return error;
    }
  }

  @Get('/representante')
  retornaListaSesionesRepresentantePorId(@Query() query) {
    try {
      const { usuario } = query;
      // return...
      return this.sesionesService.retornaSesionesRepresentantePorId(usuario);
    } catch (error) {
      return error;
    }
  }

  @Post('representantes/retirar')
  retirarRepresentantesSesion(@Body() body) {
    try {
      const { sesionID, representanteID } = body;
      // return...
      return this.sesionesService.retirarRepresentanteSesion(sesionID, representanteID);
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sesionesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSesioneDto: SesionesModel) {
    return this.sesionesService.update(id, updateSesioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sesionesService.remove(id);
  }

}
