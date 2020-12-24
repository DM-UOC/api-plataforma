import { PartialType } from '@nestjs/mapped-types';
import { CreateConferenciaDto } from './create-conferencia.dto';

export class UpdateConferenciaDto extends PartialType(CreateConferenciaDto) {
  id: number;
}
