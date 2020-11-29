import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioModel } from '../../../models/usuarios/usuario.model';
import { ProfesoresService } from './profesores.service';

describe('ProfesoresService', () => {
  let service: ProfesoresService;
  let model: UsuarioModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfesoresService],
      imports: [UsuarioModel]
    }).compile();

    service = module.get<ProfesoresService>(ProfesoresService);
    model = module.get<UsuarioModel>(UsuarioModel);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
