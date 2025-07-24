import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { z } from "zod";
import { ContentModel, LinkModel, UserModel } from "./db";
import dotenv from "dotenv";
dotenv.config();
import { authMiddleware } from "./middleware";
import { random } from "./utils";

import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

async function main() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/brainly");
}

main();
const userProfile = z.object({
  username: z
    .string()
    .min(3, { message: "Username should be at least 3 characters" }),
  password: z.string().min(8, { message: "Should have at least 8 characters" }),
});

app.post("/api/v1/signup", async (req, res) => {
  // console.log("object")
  const validBody = userProfile.safeParse(req.body);
  // console.log(validBody);
  if (!validBody.success) {
    res.status(411).send(validBody.error);
    return;
  } else {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user) {
      res.send( "Username Already Exists");
      return;
    }

    const newUser = new UserModel(validBody.data);
    await newUser
      .save()
      .then(() => res.send("User Registered"))
      .catch((err) => res.send(err));
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const user = await UserModel.findOne({ username: req.body.username });
  if (user) {
    //@ts-ignore
    const JWT_PASSWORD:string = process.env.JWT_PASSWORD;
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_PASSWORD
    );

    res.json({ token });
  } else {
    res.send("Incorrect Credentials");
  }
});

app.post("/api/v1/content", authMiddleware, async (req, res) => {
  console.log(req.body);
  const content = new ContentModel(req.body);
  await content
    .save()
    .then(() => res.send("Content Added"))
    .catch((err) => res.send(err));
});

app.get("/api/v1/content", authMiddleware, async (req, res) => {
  // console.log(req.body.userId)
  const content = await ContentModel.find({
    userId: [req.body.userId],
  }).populate("userId", "username");

  res.json({ content });
});

app.delete("/api/v1/content", authMiddleware, async (req, res) => {
  await ContentModel.deleteOne({
    _id: req.body.id,
    userId: req.body.userId,
  })
    .then(() => res.send("Content Deleted"))
    .catch((err) => res.send(err));
});

app.post("/api/v1/brain/share", authMiddleware, async (req, res) => {
  const share = req.body.share;
  if (share) {
    await LinkModel.create({
      userId: req.body.userId,
      hash: random(10),
    });
  } else {
    LinkModel.deleteOne({
      userId: req.body.userId,
    });
  }

  res.json({
    message: " Shareable Link Updated",
  });
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const link = await LinkModel.findOne({
    hash: hash,
  });
  if (!link) {
    res.status(411).json({
      message: "Incorrect Input",
    });
    return;
  }

  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  res.json({
    username: user?.username,
    content: content,
  });
});

import path from "path";



app.use(express.static(path.join(__dirname, "../brainly-frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../brainly-frontend/dist/index.html"));
});

app.listen(3000);


