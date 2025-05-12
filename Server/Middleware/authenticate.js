const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // تحقق من وجود التوكن
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "غير مصرح. لا يوجد توكن" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // تأكد من ضبط المتغير في env
    req.user = decoded; // يفترض أن التوكن يحتوي على id أو payload مفيد
    next();
  } catch (err) {
    return res.status(401).json({ error: "توكن غير صالح" });
  }
};

module.exports = authenticate;
