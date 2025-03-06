import mongoose from "mongoose";

export default async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log(`Conexión establecida correctamente con la BD`);
  } catch (error) {
    console.log(`Error de al conectar a la base de datos: ${error.message}`);
  }
}
export const isValidID = (id) =>{ 
  return mongoose.Types.ObjectId.isValid(id); 
};