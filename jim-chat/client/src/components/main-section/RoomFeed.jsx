import RoomCard from "./RoomCard";

function RoomFeed(props) {
    return (
        <>
            <h1>ROOM FEED</h1>
            {props.roomItem.map((room, index) => (
                <RoomCard 
                key={index}
                room={room}
                token={props.token}
                fetchRooms={props.fetchRooms}
                userId={props.userId}
                />
            ))}
        </>
    )
}

export default RoomFeed