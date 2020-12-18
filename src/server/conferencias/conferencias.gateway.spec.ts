import { Test, TestingModule } from '@nestjs/testing';
import { ConferenciasGateway } from './conferencias.gateway';
import { ConferenciasService } from './conferencias.service';

describe('ConferenciasGateway', () => {
  let gateway: ConferenciasGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConferenciasGateway, ConferenciasService],
    }).compile();

    gateway = module.get<ConferenciasGateway>(ConferenciasGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
