import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RepresentanteModel } from 'src/server/models/representantes/representante.model';
import { HijoModel } from '../../../models/representantes/hijo.model';
import { UsuarioModel } from '../../../models/usuarios/usuario.model';
import { ClientesService } from '../../../services/perfiles/clientes/clientes.service';

@Controller('clientes')
export class ClientesController {

    constructor(
        private readonly clientesService: ClientesService
    ) {}
    
    @Get()
    public async findAll(@Req() req) {
      return await this.clientesService.findAll(req);
    }

    @Get('profile/:id')
    public async findOneProfile(@Param('id') id: string, @Res() res) {
        try {
            const usuario: UsuarioModel = await this.clientesService.findOneProfile(id);
            // content - type...
            res.setHeader('Content-Type', usuario.usuario_imagen.contentType);
            // retornando la imagen...
            res.status(HttpStatus.OK).send(usuario.usuario_imagen.data.buffer);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @Get('hijos')
    public async retornarHijosPorRepresentanteId(@Res() res, @Req() req) {
        // buscando datos...
        const result = await this.clientesService.retornarHijosPorRepresentanteId(req);
        // return...
        return res.status(HttpStatus.OK).json(result);
    }

    @Get('hijo/:id')
    public async findOneHijo(@Param('id') id: string, @Res() res) {
        try {
            const hijoModel: HijoModel = await this.clientesService.findOneHijoProfile(id);
            // content - type...
            res.setHeader('Content-Type', hijoModel.foto.contentType);
            // retornando la imagen...
            res.status(HttpStatus.OK).send(hijoModel.foto.data.buffer);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @Post('/hijo')
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file, @Body() body, @Res() res, @Req() req) {
      try {
        const result = await this.clientesService.crearHijo(req, file, body);
        return res.status(HttpStatus.CREATED).json(result);
      } catch (error) {
        res.status(400).json(error);
      }
    }

    @Put('/hijo')
    @UseInterceptors(FileInterceptor('file'))
    async updateHijo(@UploadedFile() file, @Body() hijoModel: HijoModel, @Req() req) {
      try {
        // actualizando l registro...
        return await this.clientesService.actualizaHijo(req, file, hijoModel);
      } catch (error) {
        throw error;
      }
    }
    
    @Delete('/hijo/:id')
    async eliminaHijo(@Param('id') id: string) {
      try {
        return await this.clientesService.eliminaHijo(id);      
      } catch (error) {
        throw error;
      }
    }
    
    @Get('representante')
    public async verificaRepresentante(@Res() res, @Req() req) {
        try {
            const result = await this.clientesService.verificaRepresentante(req);
            return res.status(HttpStatus.CREATED).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

}
