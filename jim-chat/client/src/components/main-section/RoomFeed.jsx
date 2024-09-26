import RoomCard from "./RoomCard";

function RoomFeed(props) {
    return (
        <>
            <h1>ROOM FEED</h1>
            {props.roomFeedItem.map((room, index) => (
                <RoomCard 
                key={index}
                room={room}
                token={props.token}
                fetchRoomFeed={props.fetchRoomFeed}
                userId={props.userId}
                />
            ))}
        </>
    )
}

export default RoomFeed