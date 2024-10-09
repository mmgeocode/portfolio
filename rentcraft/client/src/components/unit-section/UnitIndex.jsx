import React, { useState, useEffect } from 'react';
import { API_UNIT_PATCH, API_UNIT_VIEW_BY_ID } from '../../constants/endpoints';
import { useParams } from 'react-router-dom';
import RCButton from '../../ui/RCButton';
import { Input, Label } from 'reactstrap';

function UnitIndex(props) {
    const params = useParams()
    const [unitData, setUnitData] = useState({});
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [addressInput, setAddressInput] = useState(unitData.address);
    const [cityInput, setCityInput] = useState(unitData.city);
    const [stateInput, setStateInput] = useState(unitData.state);
    const [zipInput, setZipInput] = useState(unitData.zip);
    const [rentInput, setRentInput] = useState(unitData.monthlyRent);
    const [unitStateInput, setUnitStateInput] = useState(unitData.unitState);

    function handleToggleEdit() {
        setEditModeEnabled(!editModeEnabled)
    }

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

    async function handleEdit() {
        try {
            // Headers
            let myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)
            myHeaders.append("Content-Type", "application/json")

            // Body
            const body = {
                address: addressInput,
                city: cityInput,
                state: stateInput,
                zip: zipInput,
                monthlyRent: rentInput,
                unitState: unitStateInput,
            }

            // Request Options
            const requestOptions = {
                method: "PATCH",
                headers: myHeaders,
                body: JSON.stringify(body)
            }

            // Send Request
            const response = await fetch(API_UNIT_PATCH + unitData._id, requestOptions)

            // PATCH Response
            const data = await response.json()
            console.log(data)

            // Refresh Unit Index
            fetchUnitData()

            // Change Edit Mode to False
            setEditModeEnabled(false)

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
            {editModeEnabled ? ( <>
                <Label for='address'>Address</Label>
                <Input 
                type='text'
                id='address'
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                />
            </>) : ( <>
                Address: {unitData.address}
            </>)}

            {editModeEnabled ? ( <>
                <Label for='city'>City</Label>
                <Input 
                type='text'
                id='city'
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                />
            </>) : ( <>
                City: {unitData.city}
            </>)}

            {editModeEnabled ? ( <>
                <Label for='state'>State</Label>
                <Input 
                type='text'
                id='state'
                value={stateInput}
                onChange={(e) => setStateInput(e.target.value)}
                />
            </>) : ( <>
                State: {unitData.state}
            </>)}

            {editModeEnabled ? ( <>
                <Label for='zip'>Zip Code</Label>
                <Input 
                type='text'
                id='zip'
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                />
            </>) : ( <>
                Zip Code: {unitData.zip}
            </>)}

            {editModeEnabled ? ( <>
                <Label for='rent'>Monthly Rent</Label>
                <Input 
                type='number'
                id='rent'
                value={rentInput}
                onChange={(e) => setRentInput(e.target.value)}
                />
            </>) : ( <>
                Monthly Rent: {unitData.monthlyRent}
            </>)}

            {editModeEnabled ? ( <>
                <Label for='unitState'>Current State</Label>
                <Input 
                type='text'
                id='unitState'
                value={unitStateInput}
                onChange={(e) => setUnitStateInput(e.target.value)}
                />
            </>) : ( <>
                Current Status: {unitData.unitState}
            </>)}

            {editModeEnabled ? ( <RCButton title='Confirm Edits' onClick={handleEdit} />) : (
                props.currentId === unitData.user_id && <RCButton title='Edit Unit' onClick={handleToggleEdit} />
            )}
        </div>
    </>
  );
}


export default UnitIndex;