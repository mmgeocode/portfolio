import PaymentsCard from "./PaymentsCard";

function PaymentsFeed(props) {
  return (
    <>
      <div className="payments-card-container">
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
      </div>
    </>
  );
}


export default PaymentsFeed;