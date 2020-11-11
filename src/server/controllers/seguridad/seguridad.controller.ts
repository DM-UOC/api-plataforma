import { Request, Response } from 'express';
import {Path, GET, ContextRequest, ContextResponse} from "typescript-rest";
import { SeguridadService } from '../../services/seguridad/seguridad.service';

@Path('/seguridad')
export class SeguridadController {

    private seguridadService: SeguridadService = new SeguridadService();

    @GET
    @Path("verifica")
    public async verificaUsuario(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            const result: any = await this.seguridadService.verificaUsuarioInicial();
            // response...
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }
    
    @GET
    @Path("login")
    public async loginUsuario(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            const result: any = await this.seguridadService.loginUsuario(req);
            // response...
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @GET
    @Path("menu")
    public async retornaMenuUsuario(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            const result: any = await this.seguridadService.retornaMenuUsuario(req);
            // response...
            res.status(200).json(result);            
        } catch (error) {
            res.status(400).json(error);
        }
    }

}