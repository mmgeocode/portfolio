import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_USER_VIEW_BY_ID } from '../../constants/endpoints';


function ProfileView(props) {
    const params = useParams()
    const [ProfileView, setProfileView] = useState({});

    async function fetchProfile() {
        try {
            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)

            // Request Options
            let requestOptions = { method: "GET", headers: myHeaders }

            // Send Request
            const response = await fetch( API_USER_VIEW_BY_ID + "/" + params.id, requestOptions)

            // Get Response
            const data = await response.json()

            // Set State
            setProfileView(data.user)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchProfile()
    }, [props.token]);

    return (
        <>
            <h1>Profile View</h1>
        </>
    )
}

export default ProfileView