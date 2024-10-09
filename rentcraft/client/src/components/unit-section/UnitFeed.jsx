import UnitCard from "./UnitCard";

function UnitFeed(props) {
  return (
    <>
        <h2>Unit Feed</h2>
        {props.unitFeedItems.map((unit, index) => (
            <UnitCard
            token={props.token}
            currentId={props.currentId}
            fetchUnitFeed={props.fetchUnitFeed}
            key={index}
            unit={unit}
            _id={props._id}
            active={props.active}
            address={props.address}
            city={props.city}
            state={props.state}
            zip={props.zip}
            unitState={props.unitState}
            user_id={props.user_id}
            />

        ))}
    </>
  );
}


export default UnitFeed;