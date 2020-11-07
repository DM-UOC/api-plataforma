import { getModelForClass } from "@typegoose/typegoose";
import { CatalogoModel } from "../../models/catalogo.model";

export class CatalgoService {

    public async retornaCatalogPorCodigo(codigo: string) {
        try {
            const filtro: object = {
                codigo
            };
            // consulta por codigo...
            return <CatalogoModel> await getModelForClass(CatalogoModel).findOne(filtro);                
        } catch (error) {
            throw error;            
        }
    }
    
}