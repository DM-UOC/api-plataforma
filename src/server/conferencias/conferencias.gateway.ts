import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ConferenciasService } from './conferencias.service';
import { CreateConferenciaDto } from './dto/create-conferencia.dto';
import { UpdateConferenciaDto } from './dto/update-conferencia.dto';

@WebSocketGateway()
export class ConferenciasGateway {

  constructor(
    private readonly conferenciasService: ConferenciasService
  ) {}

  @SubscribeMessage('createConferencia')
  create(@MessageBody() createConferenciaDto: CreateConferenciaDto) {
    return this.conferenciasService.create(createConferenciaDto);
  }

  @SubscribeMessage('findAllConferencias')
  findAll() {
    return this.conferenciasService.findAll();
  }

  @SubscribeMessage('findOneConferencia')
  findOne(@MessageBody() id: number) {
    return this.conferenciasService.findOne(id);
  }

  @SubscribeMessage('updateConferencia')
  update(@MessageBody() updateConferenciaDto: UpdateConferenciaDto) {
    return this.conferenciasService.update(updateConferenciaDto.id, updateConferenciaDto);
  }

  @SubscribeMessage('removeConferencia')
  remove(@MessageBody() id: number) {
    return this.conferenciasService.remove(id);
  }
}
