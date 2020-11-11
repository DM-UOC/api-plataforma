import { Server } from "typescript-rest";

export class Controllers {

    constructor(app: any) {
        try {
            // inserción de controladores...
            Server.loadServices(app, [`${__dirname}/*/*`])
        } catch (error) {
            throw error;
        }
    }

    static init(app: any) {
        return new Controllers(app);
    }

}