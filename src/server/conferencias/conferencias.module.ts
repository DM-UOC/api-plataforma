import { Module } from '@nestjs/common';
import { ConferenciasService } from './conferencias.service';
import { ConferenciasGateway } from './conferencias.gateway';

@Module({
  providers: [ConferenciasGateway, ConferenciasService]
})
export class ConferenciasModule {}
