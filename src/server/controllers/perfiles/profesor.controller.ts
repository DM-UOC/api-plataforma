import { Request, Response } from "express";
import { ContextRequest, ContextResponse, DELETE, GET, Path, POST, PUT } from "typescript-rest";

@Path('/profesor')
export class UsuarioProfesorController {


    @GET
    @Path("listar")
    public async listarProfesores(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            res.send('LISTAR');
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @GET
    @Path("retorna")
    public async retornaProfesor(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            res.send('RETORNA');
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @POST
    @Path("crear")
    public async crearProfesor(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            res.send('CREAR');
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @PUT
    @Path("editar")
    public async editarProfesor(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            res.send('EDITAR');
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @DELETE
    @Path("eliminar")
    public async eliminarProfesor(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            res.send('EDITAR');
        } catch (error) {
            res.status(400).json(error);
        }
    }
        
}