import { Injectable } from '@nestjs/common';
import { CreateConferenciaDto } from '../../models/conferencias/dto/create-conferencia.dto';
import { UpdateConferenciaDto } from '../../models/conferencias/dto/update-conferencia.dto';

@Injectable()
export class ConferenciasService {

  create(createConferenciaDto: CreateConferenciaDto) {
    return 'This action adds a new conferencia';
  }

  findAll() {
    return `This action returns all conferencias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conferencia`;
  }

  update(id: number, updateConferenciaDto: UpdateConferenciaDto) {
    return `This action updates a #${id} conferencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} conferencia`;
  }
  
}
