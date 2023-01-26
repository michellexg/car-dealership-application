import { NavLink } from 'react-router-dom';

function SaleRecordList({salerecords, getSaleRecords}){
    if (salerecords === undefined){
        return null;
    }
    return(
        <>

        <h1>List of Sales</h1>
        <ul>
        <li className="nav-item">
              <NavLink className="nav-link" to="/sales/salerecord">Create a sale record</NavLink>
            </li>
        </ul>
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Sales Person</th>
            <th>Sales Person Employee Number</th>
            <th>Purchaser</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {salerecords.map(salesrecord => {
            return (
              <tr key={salesrecord.vin}>
                <td>{ salesrecord.sales_person.sales_person_name }</td>
                <td>{ salesrecord.sales_person.employee_number }</td>
                <td>{ salesrecord.customer.customer_name }</td>
                <td>{ salesrecord.automobile.vin }</td>
                <td>{ salesrecord.price }</td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </>

    )
}
export default SaleRecordList;
