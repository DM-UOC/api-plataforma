import { Controller, Get, Post, Body, Put, Param, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UsuarioModel } from 'src/server/models/usuarios/usuario.model';
import { AdministradoresService } from '../../../services/perfiles/administradores/administradores.service';


@Controller('administradores')
export class AdministradoresController {
  constructor(private readonly administradoresService: AdministradoresService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file, @Body() usuarioModel: UsuarioModel) {
    
    return "creando el usuario...";
    //return this.administradoresService.create(file, usuarioModel);
  }

  @Get()
  public async findAll() {
    return await this.administradoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administradoresService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() usuarioModel: UsuarioModel) {
    return this.administradoresService.update(+id, usuarioModel);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administradoresService.remove(+id);
  }

}
