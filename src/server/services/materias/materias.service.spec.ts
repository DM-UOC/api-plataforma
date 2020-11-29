import { Test, TestingModule } from '@nestjs/testing';
import { MateriaModel } from '../../models/materias/materia.model';
import { MateriasModule } from '../../modules/materias/materias.module';
import { MateriasService } from '../../services/materias/materias.service';

describe('MateriasService', () => {
  let service: MateriasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriasService],
      imports: [MateriasModule, MateriaModel]
    }).compile();

    service = module.get<MateriasService>(MateriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
