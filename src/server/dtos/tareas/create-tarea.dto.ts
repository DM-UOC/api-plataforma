import { TareaModel } from "src/server/models/tareas/tarea.model";
import { UsuariosInformacionDto } from "../comuns/usuario.informacion.dto";

export class CreateTareaDto {

    tarea?: TareaModel;
    profesor?: UsuariosInformacionDto;

}
