import { Controller, Get, Post, Put, Delete, HttpStatus, Res, Req } from '@nestjs/common';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Controller('usuarios')
export class UsuariosController {

    constructor(
        private readonly usuariosService: UsuariosService,
    ) {}


}
