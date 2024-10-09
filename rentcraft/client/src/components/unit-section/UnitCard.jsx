import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { API_UNIT_VIEW_BY_ID } from "../../constants/endpoints";
import RCButton from "../../ui/RCButton";

function UnitCard(props) {
    const { _id, user_id, address, city, state, zip, unitState } = props.unit
    const navigate = useNavigate()

    async function handleViewUnit() {
        // navigate(API_UNIT_VIEW_BY_ID + _id)
        try {
            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)

            // Request Options
            let requestOptions ={
                method: "GET",
                headers: myHeaders
            }

            // Send Request
            const response = await fetch(API_UNIT_VIEW_BY_ID + _id, requestOptions)

            // GET Response
            const data = await response.json()

            // Navigate to UnitIndex
            navigate('/unit/' + data.unit._id)

        } catch (error) {
            console.error(error)
        }
    }
    
  return (
    <>
        <h2>Unit Card</h2>
        <Card className="unit">
            <CardHeader>
                Address: {address}
                ID: {_id}
                User ID: {user_id}

            </CardHeader>

            <CardBody>
                City: {city}
                State: {state}
                Zip: {zip}
            </CardBody>

            <CardFooter>
                Unit State: {unitState}
                <RCButton title='View Unit' onClick={handleViewUnit} />
            </CardFooter>
        </Card>
    </>
  );
}


export default UnitCard;