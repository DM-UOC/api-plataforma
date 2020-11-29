import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosModule } from '../../modules/usuarios/usuarios.module';
import { MateriasService } from '../../services/materias/materias.service';
import { MateriasController } from './materias.controller';
import { MateriasModule } from '../../modules/materias/materias.module';

describe('MateriasController', () => {
  let controller: MateriasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriasController],
      providers: [MateriasService],
      imports: [UsuariosModule, MateriasModule]
    }).compile();

    controller = module.get<MateriasController>(MateriasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
