import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

export class RepresentanteModel {

    @prop({ required: true })
    public usuario_id?: Types.ObjectId;
    
}
