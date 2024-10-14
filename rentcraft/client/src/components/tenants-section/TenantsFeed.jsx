import TenantsCard from "./TenantsCard";

function TenantsFeed(props) {
    const activeTenants = props.tenantsData.filter((tenant) => tenant.active === true)

  return (
    <>
      <div className="tenants-card-container">
        {activeTenants.map((tenant, index) => (
          <TenantsCard 
          key={index}
          tenant={tenant}
          fetchTenants={props.fetchTenants}
          token={props.token}
          currentId={props.currentId}
          />
        ))}
      </div>
    </>
  );
}


export default TenantsFeed;