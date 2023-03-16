import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { URL } from '../URL';

export function AdminAllUser() {

    const allUser = async () => {
        const data = await axios.get(`${URL}/Admin/customers`);
        setCustomers(data.data);
       // console.log(data.data);
        console.log("hello inside the useeffect initial render");
    }

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        allUser();
    }, []);

    return (
        
        <>

            <table className="table table-hover text-center">
                <thead>
                    <tr>
                        <th scope="col">Cust_Id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">View All Bookings</th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((cust, i) => (
                        <>
                            <tr>
                                <td>{cust.cust_Id}</td>
                                <td>{cust.firstname}</td>
                                <td>{cust.lastname}</td>
                                <td>{cust.email}</td>
                                <td>{cust.mobile}</td>
                                <td><Link to={"/Admin/customer-booking/"+cust.cust_Id} className="nav-link"><Button variant="primary" size="sm"><span id="span-hide" >show</span></Button></Link></td>

                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
            <br />
        </>
    );
}