import { useNavigate } from "react-router-dom";
import RCButton from "../../ui/RCButton";

function WelcomeIndex(props) {
    const navigate = useNavigate()
    const handleAuth = () => { navigate("/auth") }

  return (
    <>
        <div className="welcome-index">
            <h1>Welcome to RentCraft</h1>
            {!props.token ? (<RCButton onClick={handleAuth} title="Login or Register" />) : (<h2>You have a token</h2>)}
        </div>
    </>
  );
}


export default WelcomeIndex;