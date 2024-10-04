function RoomEditButton(props) {
  return (
    <div className="room-edit-button" onClick={props.onClick}>
        {props.title}
    </div>
  );
}


export default RoomEditButton;