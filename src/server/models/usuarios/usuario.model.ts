import cryptojs from "crypto-js";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { AuditoriaModel } from "../comuns/auditoria.model";
import { UsuarioPerfilModel } from "./usuario.perfil.model";
import { UsuarioValidacionModel } from "./usuario.validacion.model";

// encrypt keys...
const ENCRYPT_ALGORITHM = process.env.ENCRYPT_ALGORITHM || '', ENCRYPT_KEY = process.env.ENCRYPT_KEY || '';
const IV_LENGTH = 16; // For AES, this is always 16

export class UsuarioModel {

    public readonly _id?: Types.ObjectId;
    
    @prop({ required: true, default: '' })
    public nombre?: string;

    @prop({ required: true, default: '' })
    public apellido?: string;

    @prop({ required: true, default: '' })
    public nombre_completo?: string;

    @prop({ required: true, unique: true, lowercase: true, trim: true })
    public usuario?: string;

    @prop({ required: true, trim: true })
    public clave?: string;

    @prop({ required: true, unique: true, lowercase: true, trim: true })
    public correo?: string;

    @prop({ default: { data: null, contentType: null }})
    public usuario_imagen?: {
        data: Buffer,
        contentType: string
    };

    @prop({ required: true, type: UsuarioValidacionModel, _id: false })
    public validaciones?: UsuarioValidacionModel[];

    @prop({ required: true, type: UsuarioPerfilModel, _id: false })
    public perfiles?: UsuarioPerfilModel[];
    
    @prop({ type: AuditoriaModel, _id: false })
    public auditoria?: AuditoriaModel;

    @prop({ default: '' })
    public imagen_url?: string;

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
