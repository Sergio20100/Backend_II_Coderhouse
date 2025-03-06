import { cookieExtractor, verifyToken } from "../utils/index.js";

const handlePolicies = (policies) => (req, res, next) => {
  if (policies[0] === "PUBLIC") return next();
  const token = cookieExtractor(req);
  if (!token)
    return res.status(401).json({
      status: "error",
      error: "Acceso denegado. Token no proporcionado o vencido",
    });
  const user = verifyToken(token);
  if (!policies.includes(user.role.toUpperCase()))
    return res.status(403).json({
      status: "error",
      error: "Acceso prohibido. No tenes los permisos necesarios",
    });
  req.user = user;
  next();
};

export default handlePolicies;
