import axios from "axios";
import { useEffect, useState } from "react";

export function AdminUser(props) {

    const allUser = async () => {
        const data = await axios.get(`http://localhost:8080/customer-booking/${props}`);
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
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
            <br />
        </>
    );
}