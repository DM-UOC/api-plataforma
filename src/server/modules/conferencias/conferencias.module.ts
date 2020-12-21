import { Module } from '@nestjs/common';
import { ConferenciasService } from '../../services/conferencias/conferencias.service';
import { ConferenciasGateway } from '../../controllers/conferencias/conferencias.gateway';

@Module({
  providers: [ConferenciasGateway, ConferenciasService]
})
export class ConferenciasModule {}
