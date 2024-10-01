import { Card, CardBody, CardFooter, CardText, CardTitle } from "reactstrap";
import JiMButton from "../../ui/JiMButton";

function ProfileCard(props) {
  const { userName, email, password, _id } = props.profileView
  return (
    <>
      <h1>Hello from ProfileCard</h1>
      <Card>
        <CardTitle>Card Title: {userName}'s Account</CardTitle>
        <CardBody>Card Body:
          <CardText>Email: {email}</CardText>
          <CardText>ID: {_id}</CardText>
        </CardBody>
        <CardFooter>
          <JiMButton title="Edit" />
        </CardFooter>
      </Card>
    </>
  );
}


export default ProfileCard;