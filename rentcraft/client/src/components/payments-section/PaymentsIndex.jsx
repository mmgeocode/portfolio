import React, { useState, useEffect } from 'react';
import { API_PAYMENTS_VIEW_ALL, API_TENANTS_VIEW_ALL, API_UNIT_VIEW_ALL } from '../../constants/endpoints';
import PaymentsFeed from './PaymentsFeed';
import PaymentsCreate from './PaymentsCreate';
import ReturnToAuth from '../authorization-section/ReturnToAuth';

function PaymentsIndex(props) {
  const [paymentsData, setPaymentsData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [tenantData, setTenantData] = useState([]);

  async function fetchPaymentsFeed() {
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
      const response = await fetch(API_PAYMENTS_VIEW_ALL, requestOptions)

      // GET Response
      const data = await response.json()
      // console.log(data)

      // Set State
      setPaymentsData(data.payments)

    } catch (error) {
      console.error(error)
    }
  }

  async function fetchUnits() {
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
      const response = await fetch(API_UNIT_VIEW_ALL, requestOptions)

      // GET Response
      const data = await response.json()
      // console.log(data)

      // Set State
      setUnitData(data.units)

    } catch (error) {
      console.error(error)
    }
  }

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
      setTenantData(data.user_tenants)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!props.token) return;
    fetchPaymentsFeed()
    fetchUnits()
    fetchTenants()
  }, [props.token]);

  if (!props.token) {
    return <ReturnToAuth />
  }

  return (
    <>
      <div className="payments-index">
        <PaymentsCreate 
        token={props.token}
        currentId={props.currentId}
        unitData={unitData}
        tenantData={tenantData}
        fetchPaymentsFeed={fetchPaymentsFeed}
        />

        <PaymentsFeed 
        token={props.token}
        currentId={props.currentId}
        paymentsData={paymentsData}
        unitData={unitData}
        tenantData={tenantData}
        fetchPaymentsFeed={fetchPaymentsFeed}
        />
      </div>
    </>
  );
}


export default PaymentsIndex;