import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_USER_VIEW_BY_ID } from '../../constants/endpoints';
import ProfileCard from './ProfileCard'

function ProfileView(props) {
    // const params = useParams()
    // console.log(params)
    const [profileView, setProfileView] = useState({});

    async function fetchProfile() {
        try {
            // Headers
            const myHeaders = new Headers()
            myHeaders.append("Authorization", props.token)

            // Request Options
            let requestOptions = { method: "GET", headers: myHeaders }

            // Send Request
            const response = await fetch( API_USER_VIEW_BY_ID + "/" + props.currentId, requestOptions)

            // Get Response
            const data = await response.json()
            // console.log(data)

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
            <div className="profile-view">
                <ProfileCard
                profileView={profileView}
                token={props.token}
                currentId={props.currentId}
                />
            </div>
        </>
    )
}

export default ProfileView