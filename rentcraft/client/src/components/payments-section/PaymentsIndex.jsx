import React, { useState, useEffect } from 'react';
import { API_PAYMENTS_VIEW_ALL } from '../../constants/endpoints';
import PaymentsFeed from './PaymentsFeed';
import PaymentsCreate from './PaymentsCreate';

function PaymentsIndex(props) {
  const [paymentsData, setPaymentsData] = useState([]);

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

  useEffect(() => {
    if (!props.token) return;
    fetchPaymentsFeed()
  }, [props.token]);

  return (
    <>
      <div className="payments-index">
        <h2>Payments Index</h2>
        <PaymentsCreate />

        <PaymentsFeed 
        token={props.token}
        currentId={props.currentId}
        paymentsData={paymentsData}
        fetchPaymentsFeed={fetchPaymentsFeed}
        />
      </div>
    </>
  );
}


export default PaymentsIndex;