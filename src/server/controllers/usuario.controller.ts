import { Request, Response } from 'express';
import {Path, GET, ContextRequest, ContextResponse} from "typescript-rest";
import { SeguridadService } from '../services/seguridad/seguridad.service';

@Path('/usuario')
export class UsuarioController {

    private seguridadService: SeguridadService = new SeguridadService();


}