import mongoose, { ConnectionOptions } from 'mongoose';

export class MongoConexion {

    private static connectionOptions: ConnectionOptions;
    
    static async start() {
        try {
            // seteo opciones mongodb...
            this.connectionOptions = {
                useUnifiedTopology: true,
                useNewUrlParser: true
            };
            // return...
            return await mongoose.connect('mongodb://localhost/plataforma', this.connectionOptions, () => {
                console.log('Conexión con la base de datos...')
            });            
        } catch (error) {
            throw error;
        }
    }

}