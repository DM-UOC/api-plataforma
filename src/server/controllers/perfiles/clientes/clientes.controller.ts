import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HijoModel } from 'src/server/models/representantes/hijo.model';
import { UsuarioModel } from 'src/server/models/usuarios/usuario.model';
import { ClientesService } from 'src/server/services/perfiles/clientes/clientes.service';

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

    @Post('hijo')
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file, @Body() body, @Res() res, @Req() req) {
      try {
        const result = await this.clientesService.crearHijo(req, file, body);
        return res.status(HttpStatus.CREATED).json(result);
      } catch (error) {
        res.status(400).json(error);
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
