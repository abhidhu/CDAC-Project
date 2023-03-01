import axios from "axios";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

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
                        <th scope="col">Click here</th>
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
                                <td><Button prop={cust.cust_Id} variant="primary" size="sm"><span id="span-hide" >show</span></Button></td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
            <br />
        </>
    );
}