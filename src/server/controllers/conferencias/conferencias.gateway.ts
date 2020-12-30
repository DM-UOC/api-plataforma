import { WebSocketGateway, 
  SubscribeMessage, 
  MessageBody, 
  OnGatewayInit, 
  WsResponse, 
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  WebSocketServer } from '@nestjs/websockets';
import { ConferenciasService } from '../../services/conferencias/conferencias.service';
// import { CreateConferenciaDto } from '../../models/conferencias/dto/create-conferencia.dto';
// import { UpdateConferenciaDto } from '../../models/conferencias/dto/update-conferencia.dto';
import { Socket, Server } from "socket.io";
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class ConferenciasGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private numeroUsuarios: number = 0;
  private logger: Logger = new Logger('NestjsSocket');

  @WebSocketServer() server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    // validaciones extras...
    this.logger.log(`cliente conectado: ${client.id}`);
    // usuario se conecta...
    this.numeroUsuarios++;
    // emisión actualizado de usuarios...
    this.server.emit('numero-usuarios', this.numeroUsuarios);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`cliente desconectado: ${client.id}`);
    // usuario desconecta...
    this.numeroUsuarios--;
    // emisión actualizado de usuarios...
    this.server.emit('numero-usuarios', this.numeroUsuarios);
  }

  afterInit(server: any) {
    this.logger.log('************ INICIANDO GETAWAY ************');
  }

  @SubscribeMessage('envia-servidor-peerid')
  async enviaServidorPeerId(client: Socket, peerId: string) {
    client.broadcast.emit('emite-datos-conexion', {
      socketId: client.id,
      peerId
    });
  }

}
