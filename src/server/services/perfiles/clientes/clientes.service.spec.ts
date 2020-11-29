import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosModule } from '../../../modules/usuarios/usuarios.module';
import { PerfilesModule } from '../../../modules/perfiles/perfiles.module';
import { CatalogosService } from '../../catalogos/catalogos.service';
import { ClientesService } from './clientes.service';
import { AppModule } from '../../../../app.module';

describe('ClientesService', () => {
  let service: ClientesService;
  let service2: CatalogosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesService, CatalogosService],
      imports: [PerfilesModule, UsuariosModule, AppModule]
    }).compile();

    service = module.get<ClientesService>(ClientesService);
    service2 = module.get<CatalogosService>(CatalogosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
