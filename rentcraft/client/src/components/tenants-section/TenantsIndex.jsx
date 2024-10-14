import { API_TENANTS_VIEW_ALL } from "../../constants/endpoints";
import TenantsCreate from "./TenantsCreate";
import TenantsFeed from "./TenantsFeed";
import React, { useState, useEffect } from 'react';

function TenantsIndex(props) {
    const [tenantsData, setTenantsData] = useState([]);

    async function fetchTenants() {
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
            const response = await fetch(API_TENANTS_VIEW_ALL, requestOptions)

            // GET Response
            const data = await response.json()
            // console.log(data)

            // Set State
            setTenantsData(data.user_tenants)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!props.token) return;
        fetchTenants();
    }, [props.token]);

  return (
    <>
        <div className="tenants-index">
            <TenantsCreate 
            fetchTenants={fetchTenants}
            tenantsData={tenantsData}
            token={props.token}
            currentId={props.currentId}
            />

            <TenantsFeed 
            fetchTenants={fetchTenants}
            tenantsData={tenantsData}
            token={props.token}
            currentId={props.currentId}
            />
        </div>
    </>
  );
}


export default TenantsIndex;