import { Test, TestingModule } from '@nestjs/testing';
import { CatalogosService } from '../../../services/catalogos/catalogos.service';
import { UsuariosModule } from '../../../modules/usuarios/usuarios.module';
import { ProfesoresService } from '../../../services/perfiles/profesores/profesores.service';
import { ProfesoresController } from './profesores.controller';

describe('ProfesoresController', () => {
  let controller: ProfesoresController;
  let service: ProfesoresService;
  let service2: CatalogosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfesoresController],
      providers: [ProfesoresService],
      imports: [UsuariosModule, CatalogosService]
    }).compile();

    controller = module.get<ProfesoresController>(ProfesoresController);
    service = module.get<ProfesoresService>(ProfesoresService);
    service2 = module.get<CatalogosService>(CatalogosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
