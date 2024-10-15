import { useNavigate } from "react-router-dom";
import RCButton from "../../ui/RCButton";

function ReturnToAuth(props) {
    const navigate = useNavigate()

    function handleSubmit() {
        navigate("/auth")
    }
  return (
    <>
        <div className="no-authorization">
            <h2>You must login to view page</h2>
            <RCButton title='Return to Authorization' onClick={handleSubmit} />
        </div>
    </>
  );
}


export default ReturnToAuth;