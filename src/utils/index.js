import bcrypt from "bcrypt";
import env from "../config/env.js";
import jwt from "jsonwebtoken";


export const createHash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
export const isValidPassword = (password, hash) =>
  bcrypt.compareSync(password, hash);

export const generateToken = (user) => {
  return jwt.sign(user, env.jwt_secret, { expiresIn: "1800000" }); // 30 min en milisegundos
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.jwt_secret);
  } catch (err) {
    return null; // Si hay error, retorna null
  }
};

export const convertToBool = (value)=>{
  const trueValues = ["true", "on", "yes", "1", 1, true ];
  return trueValues.includes(value);
}

export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["authCookie"];//el nombre de la cookie
  }
  return token;
};