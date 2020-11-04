import { Request, Response } from 'express';
import {Path, GET, ContextRequest, ContextResponse} from "typescript-rest";

@Path('')
export class IndexController {

    @GET
    public async index(@ContextRequest req: Request, @ContextResponse res: Response) {
        // status api...
        res.status(200).json({ status: "OK: api-plataforma" });
    }

}