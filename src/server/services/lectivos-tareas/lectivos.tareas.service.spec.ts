import { Test, TestingModule } from '@nestjs/testing';
import { LectivosTareasService } from './lectivos.tareas.service';

describe('LectivosTareasService', () => {
  let service: LectivosTareasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectivosTareasService],
    }).compile();

    service = module.get<LectivosTareasService>(LectivosTareasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
