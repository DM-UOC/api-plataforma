import { Request, Response } from 'express';
import { Path, GET, ContextRequest, ContextResponse, POST, PUT} from "typescript-rest";
import { UsuarioModel } from '../../models/usuario.model';
import { ProfesorService } from '../../services/perfiles/profesor.service';

@Path('/usuario')
export class UsuarioController {

    private profesorService: ProfesorService = new ProfesorService();

    @GET
    @Path("profesor")
    public async retornaUsuarioProfesor(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            const result: UsuarioModel[] = await this.profesorService.list();
            // response...
            res.status(200).json(result);            
        } catch (error) {
            res.status(400).json(error);
        }
    }

}