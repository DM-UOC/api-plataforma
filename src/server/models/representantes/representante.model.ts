import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { HijoModel } from "./hijo.model";

export class RepresentanteModel {

    @prop({ required: true })
    public usuario_id?: Types.ObjectId;

    @prop({ required: true, type: HijoModel })
    public hijos?: HijoModel[];


}
