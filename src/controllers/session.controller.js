
export const current = (req,res)=>{
  res.send(req.user)
}

export const current_admin =  async (req, res) => {
  try {
    // console.log(req.user);
    res.status(200).send({ status: "OK", user: req.user });
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