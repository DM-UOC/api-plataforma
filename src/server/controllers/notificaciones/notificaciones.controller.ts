import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { NotificacionesService } from '../../services/notificaciones/notificaciones.service';
import { CreateNotificacioneDto } from '../../models/notificaciones/dto/create-notificacione.dto';
import { UpdateNotificacioneDto } from '../../models/notificaciones/dto/update-notificacione.dto';
import { NotificacionModel } from '../../../server/models/notificaciones/notificacion.model';

@Controller('notificaciones')
export class NotificacionesController {

  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Post()
  create(@Body() createNotificacioneDto: NotificacionModel) {
    return this.notificacionesService.create(createNotificacioneDto);
  }

  @Get()
  findAll() {
    return this.notificacionesService.findAll();
  }

  @Get('/representante/:id')
  encontrarPorRepresentante(@Param('id') id: string) {
    return this.notificacionesService.encontrarPorRepresentante(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificacionesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNotificacioneDto: UpdateNotificacioneDto) {
    return this.notificacionesService.update(+id, updateNotificacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificacionesService.remove(+id);
  }

}
