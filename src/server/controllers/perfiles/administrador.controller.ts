import { Request, Response } from "express";
import { ContextRequest, ContextResponse, DELETE, GET, Path, POST, PUT } from "typescript-rest";

@Path('/administrador')
export class UsuarioAdministradorController {


    @GET
    @Path("listar")
    public async listarAdministradores(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            res.send('LISTAR');
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @GET
    @Path("retorna")
    public async retornaAdministrador(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            res.send('RETORNA');
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @POST
    @Path("crear")
    public async crearAdministrdor(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            res.send('CREAR');
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @PUT
    @Path("editar")
    public async editarAdministrdor(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            res.send('EDITAR');
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @DELETE
    @Path("eliminar")
    public async eliminarAdministrdor(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            res.send('EDITAR');
        } catch (error) {
            res.status(400).json(error);
        }
    }
        
}