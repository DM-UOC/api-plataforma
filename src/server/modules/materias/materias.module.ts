import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { MateriasController } from '../../controllers/materias/materias.controller';
import { MateriaModel } from '../../models/materias/materia.model';
import { MateriasService } from '../../services/materias/materias.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MateriaModel,
        schemaOptions: {
          collection: "materias",
          versionKey: false
        }
      }
    ])
  ],
  exports: [
    MateriasService
  ],
  controllers: [MateriasController],
  providers: [MateriasService]
})
export class MateriasModule {}
