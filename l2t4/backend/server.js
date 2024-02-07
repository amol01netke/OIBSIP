const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const server = express();
server.use(cors());
server.use(express.json());

server.post("/api/encryptPassword", async (req, res) => {
  const { password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    return res.status(200).json({ hashedPassword });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

server.post("/api/verifyUser", async (req, res) => {
  const { enteredPassword, originalPassword } = req.body;

  try {
    const isValid = await bcrypt.compare(enteredPassword, originalPassword);

    if (isValid) {
      return res.status(200).json({ isValid });
    } else {
      return res.status(401).json({ error: "Invalid password." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Oops.. Something went wrong!" });
  }
});

server.listen(5000, () => {
  console.log("Server is running on port 5000...");
});
