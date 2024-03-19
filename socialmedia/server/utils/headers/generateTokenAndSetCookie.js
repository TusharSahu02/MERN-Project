import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, //adding this make it more secure (this cannot be access by browser)
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //CSRF attack
    maxAge: 1000 * 60 * 60 * 24 * 15, //15 days
  });

  return token;
};

export default generateTokenAndSetCookie;
