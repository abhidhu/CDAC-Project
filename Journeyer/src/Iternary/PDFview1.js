import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

import React from 'react';
import AuthService from '../Services/auth.service';



export function PDFview1(){
    return (
        <div id="print">
            <div className="container"  >
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="row">

                            <div className="col-5">
                                <img src="/Images/Logo_img.svg" width="100" height="auto" />
                            </div>
                            <div className="col-7 mt-4 ">
                                <div >
                                    <h1 className="modal-title ">Tour deatils</h1>
                                </div>
                            </div>

                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="mt-3 text-center">
                                {pack.map((pkg, i) => (
                                    <div>
                                        <h2 className="ms-2 mb-2 text-warning">{pkg.packagename}</h2>
                                        <h3 className="ms-2 mb-2 text-secondary">From {pkg.startdate} to {pkg.enddate}</h3>
                                        <h3 className="ms-2 text-secondary">{calD(`${pkg.startdate}`, `${pkg.enddate}`)} Days , {calN(`${pkg.startdate}`, `${pkg.enddate}`)} Nights </h3>
                                    </div>

                                ))}
                            </div>
                        </div>
                        <hr>
                        </hr>
                        <div className="row mt-3">
                            <div className="col-4 text-center">
                                <h3>Customer Details</h3>
                            </div>
                            <div className="col-4">
                                <h2></h2>
                            </div>
                            <div className="col-2 text-center">
                                <h4>Current Date -</h4>
                            </div>
                            <div className="col-2 text-center">
                                <h4>{currentdate()}</h4>
                            </div>

                        </div>
                        <hr>
                        </hr>
                        <div className="row">
                            <div className="col-12 mt-3">

                                {customer.map(cust => (<>

                                    <Row className="mb-3">

                                        <Form.Group as={Col} controlId="formGridFristName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" name="FirstName" value={cust.firstname} disabled />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridLastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" name="LastName" value={cust.lastname} disabled />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="Email" name="Email" value={cust.email} disabled />
                                        </Form.Group>


                                    </Row>
                                    <Row className="mb-3">
                                        <hr></hr>
                                        <div className="col-12 mt-1">
                                            <div id="Cost">

                                                <h2>Passnger Details</h2>
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Sr. No.</th>
                                                            <th scope="col">First Name</th>
                                                            <th scope="col">Last Name</th>
                                                            <th scope="col">Gender</th>
                                                            <th scope="col">Age</th>
                                                            <th scope="col">Cost</th>

                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {booking.map((book, i) => (
                                                            <>
                                                                <tr key={i}>
                                                                    <th scope="row">{i + 1}</th>
                                                                    <td>{book.firstname}</td>
                                                                    <td>{book.lastname}</td>
                                                                    <td>{book.gender}</td>
                                                                    <td>{calage(`${book.dob}`)}</td>
                                                                    <td>₹{book.cost}</td>
                                                                </tr>
                                                            </>
                                                        ))}
                                                        <tr>

                                                            <td colSpan="4">
                                                                Total Passanger
                                                            </td>
                                                            <td colSpan="2">
                                                                {calperson(booking)}
                                                            </td>
                                                        </tr>
                                                        <tr>

                                                            <td colSpan="5">
                                                                Tour cost
                                                            </td>
                                                            <td colSpan="1">
                                                                ₹{calcost(booking)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="5">
                                                                GST (2.5% SGST + 2.5% CGST)
                                                            </td>
                                                            <td colSpan="1">
                                                                ₹{calGst(booking)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="5">
                                                                Total Cost for Tour(included Gst)
                                                            </td>
                                                            <td colSpan="1">
                                                                <b> ₹{caltoalcost(booking)}</b>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <br />
                                            </div>
                                        </div>
                                    </Row>
                                    <div className="mb-5 noprint" >
                                        <Form>
                                            <Form.Group as={Col} controlId="formGridCustomerid" name="paymentmode" onChange={handleChange}>
                                                <Form.Label>Select payemnt Mode</Form.Label>
                                                <Form.Select name="paymentmode" id="paymentmode" defaultValue="Choose..." required>
                                                    <option>Choose...</option>
                                                    <option >Credit Card</option>
                                                    <option >Debit Card</option>
                                                    <option >Net Banking</option>
                                                    <option >UPI</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <div className="text-center mt-3">
                                                <Button className="btn btn-warning mb-2 btn-lg" data-html2canvas-ignore="true" id="btn" type="button" onClick={generatepdf}>Book a Tour
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </>))}

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >

    )
}

}