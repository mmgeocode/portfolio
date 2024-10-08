function RCButton(props) {
  return (
    <>
        <div className="rc-button" onClick={props.onClick}>
            {props.title}
        </div>
    </>
  );
}


export default RCButton;