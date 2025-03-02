import { Schema, model, SchemaTypes } from "mongoose";
import  paginate  from "mongoose-paginate-v2";

const TicketSchema = new Schema({
  code:{
    type: String,
    unique:true,
  },
//   date:Date,
  purchaser:{
    type: String, ref: "users.email" 
  },
  amount: Number, // totalprice
},{
  timestamps: true, // Añade timestamps para generar createdAt y updatedAt
  versionKey: false, // Elimina el campo __v de versión
});
TicketSchema.plugin(paginate);

export default model("tickets", TicketSchema);
