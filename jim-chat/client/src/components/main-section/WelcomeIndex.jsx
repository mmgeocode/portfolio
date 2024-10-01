import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardText, CardTitle } from 'reactstrap';
import JiMButton from '../../ui/JiMButton';

function WelcomeIndex(props) {
    const navigate = useNavigate()
    // console.log(props.currentId)
    // console.log(props.token)
    const handleAuth = () => { navigate("/auth") }
    const handleNavigateToMain = () => { navigate("/feed/" + props.currentId)}
    // const handleGetStarted = () => { navigate("/room/create")}

    return (
        <>
            <div className="welcome-index">
                <h1>Welcome to JiM CHAT!</h1>
                {/* <Card> */}
                    {/* <CardTitle>Welcome to JiM Chat!</CardTitle> */}
                    {/* <CardText>Let's get you started</CardText> */}
                    {/* {!props.currentId ? (<JiMButton onClick={handleAuth} title="Register">Register/Log In</JiMButton>) : (<JiMButton onClick={handleGetStarted}>Create New Room</JiMButton>)} */}
                    {props.currentId ? handleNavigateToMain() : (<JiMButton title="Login or Register" onClick={handleAuth}>TEST</JiMButton>) }
                {/* </Card> */}
            </div>
        </>
    )
}

export default WelcomeIndex