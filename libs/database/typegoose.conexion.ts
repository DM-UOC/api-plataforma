import { TypegooseModule } from 'nestjs-typegoose';

export const typeGooseConexion = () => {
    /* ***
    return TypegooseModule.forRoot("mongodb://localhost:27017/plataforma", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    *** */
    return TypegooseModule.forRoot(
        `mongodb+srv://${process.env.DB_MOONGO_USER}:${process.env.DB_MOONGO_PASS}@cluster0.kubex.mongodb.net/${process.env.DB_MOONGO_DB}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });    
}