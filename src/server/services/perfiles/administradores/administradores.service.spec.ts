import { Test, TestingModule } from '@nestjs/testing';
import { typeGooseConexion } from 'libs/database/typegoose.conexion';
import { AdministradoresService } from './administradores.service';

describe('AdministradoresService', () => {
  let service: AdministradoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministradoresService],
      imports: [
        typeGooseConexion()
      ]
    }).compile();

    service = module.get<AdministradoresService>(AdministradoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
