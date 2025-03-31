import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
// import { JWT_SECRET } from "@repo/backend-common/config";
const { JWT_SECRET } = require("@repo/backend-common/config");
// import { CreateUserSchema} from "@repo/common/types";
const { CreateUserSchema, SigninSchema, CreateRoomSchema } = require("@repo/common/types");
// import { prismaClient } from "@repo/db/client";
const { prismaClient } = require("@repo/db/client");
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signup', async (req, res) => {
    const data = CreateUserSchema.safeParse(req.body);
    console.log("Body is ");
    console.log(req.body.name,req.body.username,req.body.password);
    
    if (!data.success) {

        res.json({
            message: "Incorrect Inputs"
        });
        return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    try {
        console.log("Creating user");

        const user = await prismaClient.user.create({
            data: {
                email: req.body.username,
                name: req.body.name,
                password: hashedPassword,
                // rooms: req.body.rooms,
            }
        })
        console.log("After user created");


        res.json({
            userId: user.id
        });

    } catch (e) {
        console.log("Error is", e);

        res.status(411).json({
            message: "Error creating user user alredy exists"
        })
    }
})

app.post('/signin', async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect Inputs"
        });
        return;
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
        }
    });
    if (!user) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }
    const isPasswordValid = await bcrypt.compare(parsedData.data.password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }


    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET);

    res.json({
        token
    });
});

app.post("/room", middleware, async (req, res) => {

    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect Inputs"
        });
        return;
    }

    try {
        const userId = req.userId;

        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        });

        res.json({
            roomId: room.id,
        });
    } catch (error) {
        console.log(error);
        res.status(411).json({
            message: "Room alredy exists with this name"
        })
    }
});

app.get("/chats/:roomId", async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);
        console.log(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 1000
        });

        res.json({
            messages
        })
    } catch (e) {
        console.log(e);
        res.json({
            messages: []
        })
    }

});

app.get("/room/:slug", async (req, res) => {
    try {
        const slug = req.params.slug;

        const room = await prismaClient.room.findFirst({
            where: {
                slug
            }
        });

        res.json({
            room
        });

    } catch (e) {
        console.log(e);
        res.json({
            message:"error"
        })
    }

});
app.listen(3001);