import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CatalogosController } from '../../controllers/catalogos/catalogos.controller';
import { CatalogoModel } from '../../models/catalogos/catalogo.model';
import { CatalogosService } from '../../services/catalogos/catalogos.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: CatalogoModel,
                schemaOptions: {
                    collection: "catalogos",
                    versionKey: false
                }
            }
        ])
    ],
    exports: [
        CatalogosService
    ],
    controllers: [CatalogosController],
    providers: [CatalogosService]    
})
export class CatalogosModule {}
