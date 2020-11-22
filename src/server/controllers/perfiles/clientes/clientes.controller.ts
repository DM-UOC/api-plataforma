import { Controller, Get, HttpStatus, Param, Req, Res } from '@nestjs/common';
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

}
