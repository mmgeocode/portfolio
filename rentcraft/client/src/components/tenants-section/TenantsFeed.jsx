import TenantsCard from "./TenantsCard";

function TenantsFeed(props) {
    const activeTenants = props.tenantsData.filter((tenant) => tenant.active === true)

  return (
    <>
        <h2>Tenants Feed</h2>
        {activeTenants.map((tenant, index) => (
            <TenantsCard 
            key={index}
            tenant={tenant}
            fetchTenants={props.fetchTenants}
            token={props.token}
            currentId={props.currentId}
            />
        ))}
    </>
  );
}


export default TenantsFeed;