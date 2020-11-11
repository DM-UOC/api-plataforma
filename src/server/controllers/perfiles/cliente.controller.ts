import { Request, Response } from "express";
import { ContextRequest, ContextResponse, DELETE, GET, Path, POST, PUT } from "typescript-rest";

@Path('/cliente')
export class UsuarioClienteController {


    @GET
    @Path("listar")
    public async listarClientes(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            res.send('LISTAR');
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @GET
    @Path("retorna")
    public async retornaCliente(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            res.send('RETORNA');
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @POST
    @Path("crear")
    public async crearCliente(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            res.send('CREAR');
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @PUT
    @Path("editar")
    public async editarCliente(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            res.send('EDITAR');
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @DELETE
    @Path("eliminar")
    public async eliminarCliente(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            res.send('EDITAR');
        } catch (error) {
            res.status(400).json(error);
        }
    }
        
}