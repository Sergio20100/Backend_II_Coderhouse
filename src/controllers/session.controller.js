import UserDTO from "../DAOs/DTOs/user.dto.js";
import cookieParser from "cookie-parser";
export const current = (req, res) => {
  res.status(200).send({ status: "OK", user: new UserDTO(req.user, "out") })
}
export const userLogout = (req, res) => {
  try {
    res.clearCookie("authCookie", { httpOnly: true, secure: true });
    return res.status(200).send({ status: "OK", message: "success logout" });
  } catch (error) {
    res.status(500).send({status:"Error",message:error.message})
  }
}

export const current_admin = async (req, res) => {
  try {
    // console.log(req.user);
    res.status(200).send({ status: "OK", user: new UserDTO(req.user, "out") });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error interno del servidor", error: error.message });
  }
};

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