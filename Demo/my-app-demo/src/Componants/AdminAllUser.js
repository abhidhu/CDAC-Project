import axios from "axios";
import { useEffect, useState } from "react";
// import { Table } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';

export function AdminAllUser() {

    const allUser = async () => {
        const data = await axios.get("http://localhost:8080/all");
        setCustomers(data.data);
        console.log(data.data);
        console.log("hello inside the useeffect initial render");
    }

    const[customers,setCustomers]= useState([]);

    useEffect(() => {
        allUser();
    }, []);



    return (
        <>
            <h1>Hello inside admin </h1>


           





            <table className="table table-hover text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Booking Id</th>
                                        <th scope="col">Package Name</th>
                                        <th scope="col">Number of Passanger</th>
                                        <th scope="col">Booking Date</th>
                                        <th scope="col">Total Cost</th>
                                        <th scope="col">Request to Cancel Tours</th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {customers.map((book, i) => (
                                        <>
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{book.bookingid}</td>
                                                {customers.filter((tor) => tor.packageid === book.packageid).map((pkg) => (
                                                    <td>{pkg.packagename}</td>
                                                ))}
                                                <td>{book.totalpassanger}</td>
                                                <td>{book.bookingdate}</td>
                                                <td>₹{book.totalfinalcost}</td>
                                                <td><Button className="mt-0 mb-0" variant="danger" type="submit" onClick={() => {
                                                    const confirmBox = window.confirm(
                                                        "Do you really want to Cancel this Tour"
                                                    )
                                                    if (confirmBox === true) {

                                                      
                                                    }
                                                }}>
                                                   
                                                    <i class="bi bi-trash"></i>
                                                </Button></td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                            <br />


        </>
    );
}