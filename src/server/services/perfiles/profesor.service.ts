import { getModelForClass } from "@typegoose/typegoose";
import { UsuarioModel } from "../../models/usuario.model";

export class ProfesorService {

    async list(estado: boolean = false) {
        // filtro...
        const filtro: UsuarioModel = {
            auditoria: {
                estado
            }
        };
        // return...
        return await getModelForClass(UsuarioModel).find(filtro);
    }
    
}