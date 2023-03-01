import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function AdminUser(props) {

    const { custid } = useParams()

    const allUser = async () => {
        const data = await axios.get(`http://localhost:8080/Admin/customer-booking/${custid}`);
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
                        <th scope="col">Booking Id</th>
                        <th scope="col">Package Id</th>
                        <th scope="col">Total Passanges</th>
                        <th scope="col">Total Cost</th>
                        <th scope="col">Total GST</th>
                        <th scope="col">Total final cost</th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((book, i) => (
                        <>
                            <tr>
                                <td>{book.bookingid}</td>
                                <td>{book.packageid}</td>
                                <td>{book.totalpassanger}</td>
                                <td>{book.totalcost}</td>
                                <td>{book.totalgstcost}</td>
                                <td>{book.totalfinalcost}</td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
            <br />
        </>
    );
}