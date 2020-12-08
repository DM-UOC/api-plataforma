import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsuarioModel } from '../../../models/usuarios/usuario.model';
import { ProfesoresService } from '../../../services/perfiles/profesores/profesores.service';

@Controller('profesores')
export class ProfesoresController {

    constructor(
        private readonly profesoresService: ProfesoresService
    ) {}
    
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file, @Body() body, @Res() res, @Req() req) {
      try {
        const result = await this.profesoresService.create(req, file, body);
        return res.status(HttpStatus.CREATED).json(result);
      } catch (error) {
          throw error;
      }
    }
    
    @Get()
    public async findAll(@Req() req) {
      return await this.profesoresService.findAll(req);
    }

    @Get('profile/:id')
    public async findOneProfile(@Param('id') id: string, @Res() res) {
        try {
            const usuario: UsuarioModel = await this.profesoresService.findOneProfile(id);
            // content - type...
            res.setHeader('Content-Type', usuario.usuario_imagen.contentType);
            // retornando la imagen...
            res.status(HttpStatus.OK).send(usuario.usuario_imagen.data.buffer);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(@UploadedFile() file, @Param('id') id: string, @Body() usuarioModel: UsuarioModel, @Req() req): Promise<UsuarioModel> {
      try {
        // actualizando l registro...
        const row = await this.profesoresService.update(id, file, usuarioModel); 
        // obteniendo el host...
        const host = req.get('host');
        // seteando imagen
        row.imagen_url = `http://${host}/profesores/profile/${row._id}`;      
        // retorna...
        return row;      
      } catch (error) {
        throw error;
      }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
      try {
        return await this.profesoresService.remove(id);      
      } catch (error) {
        throw error;
      }
    }

}
