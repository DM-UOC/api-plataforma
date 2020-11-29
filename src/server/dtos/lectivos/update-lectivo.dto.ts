import { PartialType } from '@nestjs/mapped-types';
import { CreateLectivoDto } from './create-lectivo.dto';

export class UpdateLectivoDto extends PartialType(CreateLectivoDto) {}
