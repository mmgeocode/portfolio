function JiMButton(props) {
    return (
        <div
        className="jim-button" onClick={props.onClick}>
            {props.title}
        </div>
    )
}

export default JiMButton