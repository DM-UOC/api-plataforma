import { Controller, Get, Res, HttpStatus, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { UsuarioModel } from '../../models/usuarios/usuario.model';
import { SeguridadesService } from '../../services/seguridades/seguridades.service';

@Controller('seguridades')
export class SeguridadesController {

    constructor(
        private readonly seguridadesService: SeguridadesService,
    ) {}

    @Get('verifica')
    public async verificaUsuario(@Res() res: Response) {
        try {
            const result: UsuarioModel = await this.seguridadesService.verificaUsuarioInicial();
            // return...
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get('redsocial')
    public async verificaUsuarioRedSocial(@Req() req, @Res() res: Response) {
        try {
            const row: UsuarioModel = await this.seguridadesService.verificaUsuarioRedSocial(req);
            // return...
            return res.status(HttpStatus.OK).json(row);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get("login")
    public async loginUsuario(@Req() req: Request, @Res() res: Response) {
        try {
            const result: any = await this.seguridadesService.loginUsuario(req);
            // response...
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    @Get("menu")
    public async retornaMenuUsuario(@Req() req: Request, @Res() res: Response) {
        try {
            const result: any = await this.seguridadesService.retornaMenuUsuario(req);
            // response...
            return res.status(HttpStatus.OK).json(result);            
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

}
