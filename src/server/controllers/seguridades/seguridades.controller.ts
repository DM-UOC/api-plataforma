import { Controller, Get } from '@nestjs/common';
import { SeguridadesService } from 'src/server/services/seguridades/seguridades.service';

@Controller('seguridades')
export class SeguridadesController {

    constructor(
        private readonly seguridadesService: SeguridadesService
    ) {}

    @Get('verifica')
    public async verificaUsuario() {
        try {
            const result: any = await this.seguridadesService.verificaUsuarioInicial();
            return "la puta mADRE...";
        } catch (error) {
        }
    }
        
}
