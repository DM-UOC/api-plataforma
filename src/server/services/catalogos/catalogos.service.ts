import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CatalogoModel } from '../../models/catalogos/catalogo.model';

@Injectable()
export class CatalogosService {

    constructor(
        @InjectModel(CatalogoModel) private readonly catalogoModel: ReturnModelType<typeof CatalogoModel>
    ) {}

    public async retornaCatalogPorCodigo(codigo: any): Promise<CatalogoModel> {
        try {
            const filtro: object = {
                codigo
            };
            // consulta por codigo...
            return await this.catalogoModel.findOne(filtro);
        } catch (error) {
            throw error;            
        }
    }

}
