import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./Icons";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "@/draw/Game";


export type Tool="rect"| "pencil" | "circle";

export function Canvas({
    roomId,
    socket
}: {
    socket: WebSocket;
    roomId: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool,setSelectedTool]=useState<Tool>("circle");
    const [game,setGame]=useState<Game>();

    useEffect(()=>{
        game?.setTool(selectedTool);
    },[selectedTool,game])


    useEffect(() => {

        if (canvasRef.current) {
            const g=new Game(canvasRef.current, roomId, socket)
            setGame(g);
            return () => {
                g.destroy();
            }
        }


    }, [canvasRef]);

    return <div className="h-screen overflow-hidden">
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>

        <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
    </div>
}


function Topbar({selectedTool,setSelectedTool}:{
    selectedTool:Tool;
    setSelectedTool:(s:Tool)=>void
}) {
    return (
        <div className="fixed top-10 left-10 text-white">

            <div className="flex gap-2 text-white">

                <IconButton icon={<Pencil />} onClick={() => {
                    setSelectedTool("pencil")
                 }} activated={selectedTool === "pencil"}></IconButton>
                <IconButton icon={<RectangleHorizontalIcon />} onClick={() => { 
                    setSelectedTool("rect")
                }} activated={selectedTool === "rect"}></IconButton>
                <IconButton icon={<Circle />} onClick={() => {
                    setSelectedTool("circle")
                 }} activated={selectedTool === "circle"}></IconButton>

            </div>
        </div>
    )
}