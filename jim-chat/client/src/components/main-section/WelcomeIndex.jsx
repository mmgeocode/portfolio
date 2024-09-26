import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardText, CardTitle } from 'reactstrap';
import JiMButton from '../../ui/JiMButton';

function WelcomeIndex(props) {
    const navigate = useNavigate()

    const handleAuth = () => { navigate("/auth") }
    const handleGetStarted = () => { navigate("/room/create")}

    return (
        <>
            <div className="welcome-index">
                <h1>WELCOME!</h1>
                <Card>
                    <CardTitle>Welcome to JiM Chat!</CardTitle>
                    <CardText>Let's get you started</CardText>
                    {!props.currentId ? (<JiMButton onClick={handleAuth} >Register/Log In</JiMButton>) : (<JiMButton onClick={handleGetStarted}>Create New Room</JiMButton>)}
                </Card>
            </div>
        </>
    )
}

export default WelcomeIndex