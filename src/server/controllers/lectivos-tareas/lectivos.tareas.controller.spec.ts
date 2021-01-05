import { Test, TestingModule } from '@nestjs/testing';
import { LectivosTareasController } from './lectivos.tareas.controller';
import { LectivosTareasService } from '../../services/lectivos-tareas/lectivos.tareas.service';

describe('LectivosTareasController', () => {
  let controller: LectivosTareasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectivosTareasController],
      providers: [LectivosTareasService],
    }).compile();

    controller = module.get<LectivosTareasController>(LectivosTareasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
