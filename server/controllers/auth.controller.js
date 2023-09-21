import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AdminModel } from "../model/admin.model.js";

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
      return res.status(400).send("Please fill all the details.");
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new AdminModel({
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();
    res.status(201).send("Admin registered successfully.");
  } catch (error) {
    res.status(500).send("Internal server error.");
    console.log("Error in signup route", error);
  };
};

export async function signin(req, res) {
  try {
    const { email, password } = req.body;
    
    const admin = await AdminModel.findOne({ email });
    if(!admin) {
      return res.status(401).send("Incorrect email and password combination.");
    };

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if(!isPasswordValid) {
      return res.status(401).send("Incorrect email and password combination.");
    };

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    res.status(202).json({ token });
  } catch (error) {
    res.status(500).send("Internal server error.");
    console.log("Error in signin route", error);
  };
};
