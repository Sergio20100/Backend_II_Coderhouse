import { Schema, model } from "mongoose";
import  paginate  from "mongoose-paginate-v2";

const UserSchema = new Schema({
  first_name:String,
  last_name:String,
  password:String,
  email:{
      type:String,
      unique:true
  },
  age:Number,
  role:{
      type:String,
      default:'user'
  },
  cart:{
    type:Schema.Types.ObjectId,
    ref:"carts"
  }
},{
  timestamps: true, // Añade timestamps para generar createdAt y updatedAt
  versionKey: false, // Elimina el campo __v de versión
});
// Agrega mongoose-paginate-v2 para habilitar las funcionalidades de paginación.
UserSchema.plugin(paginate);
const userModel = model("users", UserSchema); 

export default userModel;
