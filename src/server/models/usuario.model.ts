import crypto from "crypto";
import { ModelOptions, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { AuditoriaModel } from "./comun/auditoria.model";
// encrypt keys...
const ENCRYPT_ALGORITHM = process.env.ENCRYPT_ALGORITHM || '', ENCRYPT_KEY = process.env.ENCRYPT_KEY || '';
const IV_LENGTH = 16; // For AES, this is always 16

@ModelOptions({
    schemaOptions: {
        collection: 'usuarios'
    }
})
export class UsuarioModel {

    @prop({  required: true })
    public catalogo_id!: Types.ObjectId;

    @prop({ required: true, default: '' })
    public nombre?: string

    @prop({ required: true, default: '' })
    public apellido?: string

    @prop({ required: true, unique: true })
    public usuario!: string;

    @prop({ required: true })
    public clave!: string;

    @prop({ type: AuditoriaModel, _id: false })
    public auditoria?: AuditoriaModel;


    public static encryptPassword = async(clave: string): Promise<string> => {

        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv(ENCRYPT_ALGORITHM, Buffer.from(ENCRYPT_KEY), iv);
        let encrypted = cipher.update(clave);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    }

    public static decryptPassword = async function(clave: string): Promise<string> {
        
        let iv = Buffer.from(clave, 'hex');
        let encryptedText = Buffer.from(clave, 'hex');
        let decipher = crypto.createDecipheriv(ENCRYPT_ALGORITHM, Buffer.from(ENCRYPT_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();

    }

}