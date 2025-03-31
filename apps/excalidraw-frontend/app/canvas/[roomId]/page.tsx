import { RoomCanvas } from "@/components/RoomCanvas";


export default async  function CanvasPage({params}:{
    params:{
        roomId:string
    }
}) {

    const roomId=(await params).roomId;
    console.log("Room id is ",roomId);

    return <RoomCanvas roomId={roomId}/>;
}