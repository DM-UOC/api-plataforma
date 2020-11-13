import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CatalogoModel } from 'src/server/models/catalogos/catalogo.model';

@Injectable()
export class CatalogosService {

    constructor(
        @InjectModel(CatalogoModel) private readonly catalogoModel: ReturnModelType<typeof CatalogoModel>
    ) {}

    public async retornaCatalogPorCodigo(codigo: string) {
        try {
            const filtro: object = {
                codigo
            };
            // consulta por codigo...
            return <CatalogoModel> await this.catalogoModel.findOne(filtro);
        } catch (error) {
            throw error;            
        }
    }

}
