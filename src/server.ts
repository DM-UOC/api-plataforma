import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import { MongoConexion } from './server/models/conexion/mongo.conexion';
import { config } from './libs/config/config';
import { Globals } from './libs/globals';
import { Controllers } from './server/controllers/controllers';
declare const global: Globals;

export class Server {

    private app: any
    private port: any;

    constructor() {
        try {
            // express...
            this.app = express();
            // configuracion...
            this.config();
            // controladores...
            this.controllers();            
        } catch (error) {
            throw error;
        }
    }
    
    private controllers() {
        try {
            Controllers.init(this.app);            
        } catch (error) {
            throw error;
        }
    }

    private config() {
        try {
            // configuraciones yaml...
            const { yamlConf } = config;
            // puerto...
            this.port = yamlConf.port;
            // helmet...
            this.app.use(helmet());
            // bodyparser...
            this.app.use(bodyParser.json({
                limit: '5mb'
            }));
            this.app.use(bodyParser.urlencoded({
                limit: '5mb',
                parameterLimit: 100000,
                extended: false 
            }))
            // express...
            this.app.use(express.json());
            this.app.use(express.urlencoded({extended: false}));
            // moragan...
            this.app.use(morgan('dev'));
            //cors...
            this.app.use(cors());
            // global config...
            global.$config = yamlConf;
            // mongodb...
            MongoConexion.start();
        } catch (error) {
            throw error;
        }        
    }

    public start() {
        // iniciando el servidor...
        this.app.listen(this.port, () => {
            console.log('Init API plataforma');
        });
    }

}