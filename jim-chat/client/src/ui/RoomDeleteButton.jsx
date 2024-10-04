function RoomDeleteButton(props) {
  return (
    <div className="room-delete-button" onClick={props.onClick}>
        {props.title}
    </div>
  );
}


export default RoomDeleteButton;