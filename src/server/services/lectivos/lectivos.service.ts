import { Injectable } from '@nestjs/common';
import { CreateLectivoDto } from '../../dtos/lectivos/create-lectivo.dto';
import { UpdateLectivoDto } from '../../dtos/lectivos/update-lectivo.dto';

@Injectable()
export class LectivosService {
  create(createLectivoDto: CreateLectivoDto) {
    return 'This action adds a new lectivo';
  }

  findAll() {
    return `This action returns all lectivos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lectivo`;
  }

  update(id: number, updateLectivoDto: UpdateLectivoDto) {
    return `This action updates a #${id} lectivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} lectivo`;
  }
}
