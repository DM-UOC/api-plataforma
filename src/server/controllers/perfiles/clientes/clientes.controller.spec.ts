import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from '../../../services/perfiles/clientes/clientes.service';
import { ClientesController } from './clientes.controller';

describe('ClientesController', () => {
  let controller: ClientesController;
  let service: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [ClientesService]
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
    service = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
