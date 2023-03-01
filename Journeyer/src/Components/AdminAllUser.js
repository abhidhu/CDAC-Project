import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export function AdminAllUser() {

    const allUser = async () => {
        const data = await axios.get("http://localhost:8080/customers");
        setCustomers(data.data);
        console.log(data.data);
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
                    {customers.map((book, i) => (
                        <>
                            <tr>
                                <td>{book.cust_Id}</td>
                                <td>{book.firstname}</td>
                                <td>{book.lastname}</td>
                                <td>{book.email}</td>
                                <td>{book.mobile}</td>
                                <td><Button variant="primary" size="sm"><span id="span-hide" >show</span></Button></td>

                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
            <br />
        </>
    );
}