import { Module } from '@nestjs/common';
import { LectivosService } from '../../services/lectivos/lectivos.service';
import { LectivosController } from '../../controllers/lectivos/lectivos.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { LectivoModel } from 'src/server/models/lectivos/lectivo.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
        {
            typegooseClass: LectivoModel,
            schemaOptions: {
                collection: "lectivos",
                versionKey: false
            }
        }
    ])
  ],
  exports: [
    LectivosService
  ],
  controllers: [LectivosController],
  providers: [LectivosService]
})
export class LectivosModule {}
