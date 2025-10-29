const User = require("../../Models/User/index");
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, country, password } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      email,
      country,
      password,
    });
    console.log("user", newUser);
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in Signup:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// module.exports = signup;

const updateUser = async (req, res) => {
  const userObject = req.body;
  const updatedUserObject = await User.findByIdAndUpdate(
    req.params.id,
    userObject,
    { new: true }
  );
  console.log("object", updatedUserObject);
  if (!updatedUserObject) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user: updatedUserObject,
  });
};

const deleteUser = async (req, res) => {
  try {
    const { email12 } = req.params;

    // const deletedUser = await User.findOneAndDelete({ email: email12 });
    const h = await User.find({ email: email12 });
    console.log("User", h);
    if (h.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const deleteUser = await User.deleteOne({ email: h[0].email });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: deleteUser,
    });
  } catch (error) {
    console.log("eroor in Delete", error);
  }
};
module.exports = { deleteUser, signup, updateUser };
// const deleteUser = async (req, res) => {
//   try {
//     const { email12 } = req.params;

//     const deletedUser = await User.findOneAndDelete({ email: email12 });

//     if (!deletedUser) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }
//     res.status(200).json({ success: true, message: "User deleted successfully" , user: deletedUser });
//   } catch (error) {
//     console.log("eroor in Delete", error);
//   }
// };
