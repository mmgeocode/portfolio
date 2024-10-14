import logo from "../../assets/RentCraftLogocropped.png"

function MainHeader(props) {
  return (
    <>
        <div className="header">
            <img src={logo} alt="rentcraft logo" className="logo" />
        </div>
    </>
  );
}


export default MainHeader;