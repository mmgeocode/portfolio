import React, { useState, useEffect } from 'react';
import { API_UNIT_VIEW_ALL } from '../../constants/endpoints';
import UnitFeed from '../unit-section/UnitFeed';
import UnitCreate from '../unit-section/UnitCreate';

function MainIndex(props) {
    const [unitFeedItems, setUnitFeedItems] = useState([]);
    const [userId, setUserId] = useState("");

    async function fetchUnitFeed() {
        try {
            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)

            // Request Options
            let requestOptions = {
                method: "GET",
                headers: myHeaders,
            }

            // Send Request
            const response = await fetch(API_UNIT_VIEW_ALL, requestOptions)

            // GET Response
            const data = await response.json()
            console.log(data)

            // Set State
            setUnitFeedItems(data.units)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchUnitFeed()
    }, [props.token]);

  return (
    <>
        <div className="main-index">
            <UnitCreate
            token={props.token}
            currentId={props.currentId}
            fetchUnitFeed={fetchUnitFeed}
            />

            <UnitFeed 
            token={props.token}
            currentId={props.currentId}
            fetchUnitFeed={fetchUnitFeed}
            unitFeedItems={unitFeedItems}
            />
        </div>
    </>
  );
}


export default MainIndex;