import cryptojs from "crypto-js";
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

    @prop({ required: true, unique: true, lowercase: true, trim: true })
    public usuario!: string;

    @prop({ required: true, trim: true })
    public clave!: string;

    @prop({ type: AuditoriaModel, _id: false })
    public auditoria?: AuditoriaModel;


    public static encryptPassword = async(clave: string): Promise<string> => {
        // Encrypt
        let ciphertext: string = cryptojs.AES.encrypt(clave, ENCRYPT_KEY).toString();
        // return...
        return ciphertext;
    }

    public static decryptPassword = async function(clave: string): Promise<string> {
        
        // Decrypt
        var bytes  = cryptojs.AES.decrypt(clave, ENCRYPT_KEY);
        var originalText = bytes.toString(cryptojs.enc.Utf8);
        // return...
        return originalText;

    }

}