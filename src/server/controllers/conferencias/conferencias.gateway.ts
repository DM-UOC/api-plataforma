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
import { UpdateConferenciaDto } from '../../models/conferencias/dto/update-conferencia.dto';
import { Socket, Server } from "socket.io";
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class ConferenciasGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  private numeroUsuarios: number = 0;
  private logger: Logger = new Logger('NestjsSocket');

  constructor(
    private readonly conferenciasService: ConferenciasService
  ) {}

  afterInit(server: Server) {
    this.logger.log('************ INICIANDO GETAWAY ************');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`cliente desconectado: ${client.id}`);
    // usuario desconecta...
    this.numeroUsuarios--;
    // emisión actualizado de usuarios...
    this.server.emit('usuarios', this.numeroUsuarios);    
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`cliente conectado: ${client.id}`);
    // usuario se conecta...
    this.numeroUsuarios++;
    // emisión actualizado de usuarios...
    this.server.emit('usuarios', this.numeroUsuarios);
  }

  @SubscribeMessage('createConferencia')
  // create(@MessageBody() createConferenciaDto: CreateConferenciaDto) {
  create(client: Socket, data: string): WsResponse<string> {
    return {
      event: 'mensajeCliente',
      data
    };
    //return this.conferenciasService.create(createConferenciaDto);
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

  @SubscribeMessage('usuario-unirse')
  // create(@MessageBody() createConferenciaDto: CreateConferenciaDto) {
  usuarioUnirse(client: Socket, data: string): void { // WsResponse<string>
    // enviando mensaje al cliente...
    this.server.emit('mensaje-cliente', data);
    /*
    return {
      event: 'mensaje-cliente',
      data
    };
    */
    //return this.conferenciasService.create(createConferenciaDto);
  }

  @SubscribeMessage('chat')
  async onChat(client: Socket, message: string){
      client.broadcast.emit('chat', message);
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: { sender: string, room: string, message: string }) {
    this.server.to(message.room).emit('chatToClient', message);
  }

  @SubscribeMessage('uneCuarto')
  handleRoomJoin(client: Socket, message: { roomId: string, userId: string } ) {
    client.join(message.roomId);
    client.to(message.roomId).broadcast.emit('usuarioConectado', message.userId);
    // client.emit('joinedRoom', message.roomId);
  }

  @SubscribeMessage('dejaCuarto')
  handleRoomLeave(client: Socket, message: { cuartoId: string, usuarioId: string } ) {
    client.leave(message.cuartoId);
    client.to(message.cuartoId).broadcast.emit('usuarioDesconectado', message.usuarioId);
    //client.emit('leftRoom', room);
  }

}
