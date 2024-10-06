import React from 'react';
import { useNavigate } from 'react-router-dom';
import JiMButton from '../../ui/JiMButton';

function WelcomeIndex(props) {
    const navigate = useNavigate()
    const handleAuth = () => { navigate("/auth") }
    const handleNavigateToMain = () => { navigate("/feed/" + props.currentId)}

    return (
        <>
            <div className="welcome-index">
                <h1>Welcome to JiM CHAT!</h1>
                {props.currentId ? handleNavigateToMain() : (<JiMButton title="Login or Register" onClick={handleAuth}>TEST</JiMButton>) }
            </div>
        </>
    )
}

export default WelcomeIndex