import { Test, TestingModule } from '@nestjs/testing';
import { SeguridadesController } from './seguridades.controller';

describe('SeguridadesController', () => {
  let controller: SeguridadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeguridadesController],
    }).compile();

    controller = module.get<SeguridadesController>(SeguridadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
