import { HTTP_BACKEND } from "@/config";
import axios from "axios";



export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    const ctx = canvas.getContext("2d");

    let existingShapes: Shape[] = await getExistingShapes(roomId);

    if (!ctx) {
        return
    }

    

    clearCanvas(existingShapes, canvas, ctx);

    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true
        startX = e.clientX
        startY = e.clientY
    })

    canvas.addEventListener("mouseup", (e) => {



        clicked = false
        const width = e.clientX - startX;
        const height = e.clientY - startY;

        //@ts-ignore
        const selectedTool = window.selectedTool;


        let shape: Shape | null = null;
        if (selectedTool === "rect") {
            shape = {
                //@ts-ignore 
                type: "rect",
                x: startX,
                y: startY,
                height,
                width
            }
            //  existingShapes.push(shape);
        }
        else if (selectedTool === "circle") {
            const radius = Math.max(width, height) / 2;

            shape = {
                //@ts-ignore 
                type: "circle",
                radius: radius,
                centreX: startX + radius,
                centreY: startY + radius,
            }
        }

        if (!shape) {
            return;
        }
        existingShapes.push(shape);



        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId
        }))

    })

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(existingShapes, canvas, ctx);
            ctx.strokeStyle = "rgba(255,255,255)";

            //@ts-ignore
            const selectedTool = window.selectedTool;
            if (selectedTool === "rect") {

                ctx.strokeRect(startX, startY, width, height);
            }
            else if (selectedTool === "circle") {
                const centreX = startX + width / 2;
                const centreY = startY + width / 2;
                const radius = Math.max(width, height) / 2;
                ctx.beginPath();


                ctx.arc(centreX, centreY, radius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.closePath();
            }

        }
    })
}

function clearCanvas(existingShapes: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    
}


