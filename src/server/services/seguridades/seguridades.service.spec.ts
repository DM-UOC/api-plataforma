import { Test, TestingModule } from '@nestjs/testing';
import { SeguridadesService } from './seguridades.service';

describe('SeguridadesService', () => {
  let service: SeguridadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeguridadesService],
    }).compile();

    service = module.get<SeguridadesService>(SeguridadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
