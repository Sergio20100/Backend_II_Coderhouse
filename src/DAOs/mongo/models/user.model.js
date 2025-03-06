import { Schema, model } from "mongoose";
import  paginate  from "mongoose-paginate-v2";

const UserSchema = new Schema({
  first_name:{
    type:String,
    required: [ true, "El first_name es obligatorio" ],
  },
  last_name:{
    type:String,
    required: [ true, "El last_name es obligatorio" ],
  },
  password:{
    type:String,
    required: [ true, "password es obligatorio" ],
  },
  email:{
      type:String,
      unique:true,
      require:[true,"el email es obligatorio"]
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
