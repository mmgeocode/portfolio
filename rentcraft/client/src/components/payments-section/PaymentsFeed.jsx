import PaymentsCard from "./PaymentsCard";

function PaymentsFeed(props) {
  return (
    <>
        <h2>Payments Feed</h2>
        {props.paymentsData.map((payments, index) => (
            <PaymentsCard 
            key={index}
            payments={payments}
            token={props.token}
            currentId={props.currentId}
            fetchPaymentsFeed={props.fetchPaymentsFeed}
            unitData={props.unitData}
            tenantData={props.tenantData}
            />
        ))}
    </>
  );
}


export default PaymentsFeed;