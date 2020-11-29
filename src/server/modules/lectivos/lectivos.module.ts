import { Module } from '@nestjs/common';
import { LectivosService } from '../../services/lectivos/lectivos.service';
import { LectivosController } from '../../controllers/lectivos/lectivos.controller';

@Module({
  controllers: [LectivosController],
  providers: [LectivosService]
})
export class LectivosModule {}
