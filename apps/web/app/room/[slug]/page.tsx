import axios from "axios";
import { BACKEND_URL } from "../../config";
import ChatRoom from "../../../components/ChatRoom";
// import { ChatRoom } from "../../../components/ChatRoom";

async function getRoomId(slug:string) {
    console.log(`${BACKEND_URL}/room/${slug}`);
    
    const respone=await axios.get(`${BACKEND_URL}/room/${slug}`)

    return respone.data.room.id;
}

export default async function ChatRoom1({
    params
}:{
    params: {
        slug:string
    }
})
{
    console.log(await params);
    
    // const slug="ujjwalroom";
    const slug=(await params).slug;
    const roomId=await getRoomId(slug)

    console.log("Before rendering");
    
    return <ChatRoom id={roomId}></ChatRoom>
}