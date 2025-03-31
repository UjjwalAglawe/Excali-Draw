import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
// import { JWT_SECRET } from "@repo/backend-common/config";
const { JWT_SECRET } = require("@repo/backend-common/config");
// const JWT_SECRET="ujjwal"
import WebSocket from "ws";
const { prismaClient } = require("@repo/db/client");


const wss = new WebSocketServer({ port: 8080 });
interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}
const users: User[] = [];

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded == "string") {
            return null;
        }
        if (!decoded || !(decoded as JwtPayload).userId) {
            return null;
        }

        return decoded.userId;
    }
    catch (e) {
        console.log(e);
        return null;
    }

}

wss.on('connection', function connection(ws, request) {

    const url = request.url;
    if (!url) {
        return;
    }

    const querryParams = new URLSearchParams(url.split('?')[1]);
    const token = querryParams.get('token') || "";

    const userId = checkUser(token);
    if (userId == null) {
        ws.close();
        return;
    }

    users.push({
        userId: userId,
        rooms: [],
        ws: ws
    })

    ws.on('message', async function message(data) {
        // const parsedData = JSON.parse(data as unknown as string);


        let parsedData;
        if (typeof data !== "string") {
            parsedData = JSON.parse(data.toString());
        } else {
            parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
        }


        if (parsedData.type == "join_room") {
            const user = users.find(x => x.ws === ws);
            if (!user) {
                return;
            }
            user.rooms.push(parsedData.roomId);
        }

        if (parsedData.type == "leave_room") {
            const user = users.find(x => x.ws === ws);
            if (!user) {
                return;
            }
            user.rooms = user.rooms.filter(x => x === parsedData.room);
        }

        if (parsedData.type == "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;


            await prismaClient.chat.create({
                data: {
                    roomId: Number(roomId),
                    message,
                    userId
                }
            })
            users.forEach(user => {

                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: 'chat',
                        message: message,
                        roomId
                    }));

                }
            })


        }


    });


});