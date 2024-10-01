function RoomJoinButton(props) {
  return (
    <div className="room-join-button" onClick={props.onClick}>
        {props.title}
    </div>
  );
}


export default RoomJoinButton;