import { Request, Response } from 'express';
import {Path, GET, ContextRequest, ContextResponse} from "typescript-rest";
import { CatalogoModel } from '../models/catalogo.model';
import { CatalgoService } from '../services/catalogos/catalogo.service';

@Path('/catalogo')
export class CatalogoController {

    private catalgoService: CatalgoService = new CatalgoService();

    @GET
    @Path("codigo")
    public async verificaUsuario(@ContextRequest req: Request, @ContextResponse res: Response) {
        try {
            const { codigo } = req.query as any;
            // query...
            const result: CatalogoModel = await this.catalgoService.retornaCatalogPorCodigo(codigo);
            console.log(result.arreglo1[0]);
            // response...
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
    }

}