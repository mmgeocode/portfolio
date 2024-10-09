import React, { useState, useEffect } from 'react';
import { API_UNIT_VIEW_BY_ID } from '../../constants/endpoints';
import { useParams } from 'react-router-dom';

function UnitIndex(props) {
    const params = useParams()
    const [unitData, setUnitData] = useState({});

    async function fetchUnitData() {
        try {
            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)

            // Request Options
            let requestOptions = {
                method: "GET",
                headers: myHeaders
            }

            // Send Request
            const response = await fetch(API_UNIT_VIEW_BY_ID + params.id, requestOptions)

            // GET Response
            const data = await response.json()
            // console.log(data)

            // Set State
            setUnitData(data.unit)
            
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchUnitData()
    }, [props.token]);

  return (
    <>
        <div className="unit-index">
            <h2>Unit Index</h2>
            Address: {unitData.address}
        </div>
    </>
  );
}


export default UnitIndex;