import { Controller, Get, Post, Put, Delete, HttpStatus, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsuariosModule } from 'src/server/modules/usuarios/usuarios.module';
import { UsuariosService } from 'src/server/services/usuarios/usuarios.service';

@Controller('usuarios')
export class UsuariosController {

    constructor(
        private readonly usuariosService: UsuariosService,
    ) {}


}
