import { TypegooseModule } from 'nestjs-typegoose';

export const typeGooseConexion = () => {
    return TypegooseModule.forRoot("mongodb://localhost:27017/plataforma", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}