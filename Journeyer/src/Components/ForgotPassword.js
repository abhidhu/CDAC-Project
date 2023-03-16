import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { URL } from '../URL';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // replace with your forgot password logic that sends OTP to the email

       
        fetch(URL+'/sendotp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error(error));




        // ff
        console.log(`Sending OTP to ${email}...`);
        setIsSubmitted(true);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        // replace with your logic to verify OTP and update the password


            fetch(URL+'/setpassword', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password, otp: otp })
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then(data => console.log(data))
                .catch(error => console.error(error));
    
        console.log(`Verifying OTP ${otp} and updating password...`);
        setShowAlert(true);
        setOtp('');
        setPassword('');
        
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Forgot Password</h2>
            {!isSubmitted ? (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                        Submit
                    </Button>
                </Form>
            ) : (
                <Form onSubmit={handleOtpSubmit}>
                    <Form.Group controlId="formOtp">
                        <Form.Label>OTP:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>New Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                        Submit
                    </Button>
                </Form>
            )}

            {showAlert && (
                <Alert variant="success" className="mt-3">
                    Password updated successfully!
                </Alert>
            )}
        </Container>
    );
}

export default ForgotPassword;