import { Controller, Get, Post, Body, Put, Param, Delete, Req, UseInterceptors, UploadedFile, Res, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuarioModel } from '../../../models/usuarios/usuario.model';
import { AdministradoresService } from '../../../services/perfiles/administradores/administradores.service';


@Controller('administradores')
export class AdministradoresController {

  constructor(
    private readonly administradoresService: AdministradoresService
    ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file, @Body() body, @Res() res, @Req() req) {
    try {
      // obteniendo el host...
      const row = await this.administradoresService.create(file, body);
      // armamos enalce de imagen...
      const host = req.get('host');
      row.imagen_url = `http://${host}/administradores/profile/${row._id}`;      
      // return...
      return res.status(HttpStatus.CREATED).json(row);
    } catch (error) {
        throw error;
    }
  }

  @Get()
  public async findAll(@Req() req) {
    return await this.administradoresService.findAll(req);
  }

  @Get('profile/:id')
  public async findOneProfile(@Param('id') id: string, @Res() res) {
    try {
      const usuario: UsuarioModel = await this.administradoresService.findOneProfile(id);
      // content - type...
      res.setHeader('Content-Type', usuario.usuario_imagen.contentType);
      // retornando la imagen...
      res.status(HttpStatus.OK).send(usuario.usuario_imagen.data.buffer);      
    } catch (error) {
      res.status(400).json(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administradoresService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(@UploadedFile() file, @Param('id') id: string, @Body() usuarioModel: UsuarioModel, @Req() req): Promise<UsuarioModel> {
    try {
      // actualizando l registro...
      const row = await this.administradoresService.update(id, file, usuarioModel); 
      // obteniendo el host...
      const host = req.get('host');
      // seteando imagen
      row.imagen_url = `http://${host}/administradores/profile/${row._id}`;      
      // retorna...
      return row;      
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.administradoresService.remove(id);      
    } catch (error) {
      throw error;
    }
  }

}
