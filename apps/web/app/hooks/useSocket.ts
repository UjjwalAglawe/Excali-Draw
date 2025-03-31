import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3YmU2M2NiYy0xNjQ3LTQ5OGItYmM4Ny1mZjliYjE5ZmViMDIiLCJpYXQiOjE3NDIyOTEyMzh9.45BWyaqs9R5_C60eUpDES7jJKfZ3Rdl2ds7BBizvOFE`);
        console.log("SENT ");
        
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, [])

    return {
        socket,
        loading
    }
}