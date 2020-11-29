import { Test, TestingModule } from '@nestjs/testing';
import { LectivosController } from './lectivos.controller';
import { LectivosService } from '../../services/lectivos/lectivos.service';

describe('LectivosController', () => {
  let controller: LectivosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectivosController],
      providers: [LectivosService],
    }).compile();

    controller = module.get<LectivosController>(LectivosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
