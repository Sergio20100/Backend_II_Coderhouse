import { Router } from "express";
import userModel from "../DAOs/mongo/models/user.model.js";
import handlePolicies from "../middlewares/handle-policies.js";
import ErrorManager from "../managers/ErrorManager.js";
import { isValidPassword ,createHash, generateToken } from "../utils/index.js";
import { cartServices, userServices } from "../repositories/services.js";

const router = Router();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
router.get("/", async (req, res) => {
  try {
    const users = await userServices.getAll();

    res.status(200).send({ status: "OK", payload:users });
  } catch (error) {
    res.status(500).send({ status: "Error interno del servidor", error: error.message });
  }
});

// router.get("/current", handlePolicies(["ADMIN", "user", "USER PREMIUM"]), async (req, res) => {
//   try {
//     console.log(req.user);

//     res.status(200).send({ status: "OK", user: req.user });
//   } catch (error) {
//     res
//       .status(500)
//       .send({ status: "Error interno del servidor", error: error.message });
//   }
// });

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findOne({ _id: id });
    console.log("Usuario desde el req: ", req.user);

    res.status(200).send({ status: "OK", user: user });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error interno del servidor", error: error.message });
  }
});




router.post('/register', async (req, res) => {
  const { first_name, last_name, email, password, role, cart } = req.body;
  try {
    // validar si vienen los campos
    const newUser = {
      first_name,
      last_name,
      email,
      password: createHash(password),
    }
    if(cart){
      try {
        const cartFound = await cartServices.getOneById(cart);
        newUser.cart = cartFound._id;
      } catch (error) {
        res.status(400).json({status:"Error",message:ErrorManager.handleError(error).message})
      }
    }
    if(role) newUser.role = role;
    const userCreated = await userServices.insertOne(newUser);
    res.status(201).json({ status: 'Ok', payload: userCreated });
    // res.redirect('/login'); 
  } catch (error) {
    res.status(500).json({ status: "Error al registrar el usuario", message: ErrorManager.handleError(error).message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await userServices.getOneByEmail(email);

    if (!userFound ||!isValidPassword(password, userFound.password) ) return res.status(401).json({status:"Error",message: "Credenciales invalidas"});
    // en caso tal pase la validacion de la password
    const user = { ...userFound._doc };
    delete user.password;
    
    let token = generateToken(user);
    //   res.status(200).send({ message: "Login exitoso", token: token });
    res.cookie("authCookie", token, { maxAge: 60 * 60 * 1000, httpOnly: true }).status(200).send({ status: "Login exitoso" });


  } catch (error) {
    res.status(400).json({status:"Error en el login",message:error.message})
    throw error;
  }
});

export default router;
