import passport from "passport";
import jwt from "passport-jwt";
import env from "./env.js";
import { cookieExtractor } from "../utils/index.js";
const JWTStratgy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const initializePassport = () => {
  //Strategies
  passport.use(
    "current",
    new JWTStratgy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: env.jwt_secret, //la misma que pase en utils al sign
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);//user o false
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};


export default initializePassport;
