import { NavLink } from "react-router-dom";

function ReturnToAuth(props) {
  return (
    <>
        <div className="return-to-auth">
            <h1>You Must Login to View This Page</h1>
            <NavLink to="/auth">Click to Login</NavLink>
        </div>
    </>
  );
}


export default ReturnToAuth;