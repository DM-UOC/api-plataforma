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
  private listaClientesVivo: any [] = [];

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
    // si se desconecta... eliminamos del arreglo...
    this.listaClientesVivo = this.listaClientesVivo.filter(clienteVivo => clienteVivo.clienteSocketId !== client.id);
    // emisión actualizado de usuarios...
    this.server.emit('numero-usuarios', this.numeroUsuarios);
  }

  afterInit(server: any) {
    this.logger.log('************ INICIANDO GETAWAY ************');
  }

  @SubscribeMessage('infoCliente')
  async infoCliente(client: Socket, message: {
    token: any,
    peerId: string
  }) {
    // desectrucura el objeto...
    const { token, peerId } = message;
    // setea objeto a devolver...
    let infoCliente = {
      tokenCliente: token,
      peerIdCliente: peerId,
      clienteSocketId: client.id
    };
    // registra usuarios en vivo en el arreglo...
    this.listaClientesVivo.push(infoCliente);
    // emision de usuario...
    this.server.emit('emiteInfoCliente', {
      tokenCliente: infoCliente.tokenCliente,
      listaClientes: this.listaClientesVivo
    });
  }

  @SubscribeMessage('llamadaPara')
  async llamadaPara(client: Socket, message: any) {
    // desestrucutra el mensaje...
    const  { clienteSocketId } = message;
    // enviamos el mensaje al cliente...
    client.to(clienteSocketId).emit('llamadaDesde', message);
    // client.emit('lamadaDesde', message);
    // this.server.emit('lamadaDesde', token);
    // client.broadcast.emit('lamadaDesde', message);
  }

  @SubscribeMessage('envia-servidor-peerid')
  async enviaServidorPeerId(client: Socket, peerId: string) {
    client.broadcast.emit('emite-datos-conexion', {
      socketId: client.id,
      peerId
    });
  }

}
