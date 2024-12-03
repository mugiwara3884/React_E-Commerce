import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const newUser = { email, fname, lname, password };

        try {
            const response = await fetch('http://localhost:4000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            const result = await response.json();
            if (response.status === 200) {
                setMessage('Registration successful!');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container my-3 py-3">
            <h1 className="text-center">Register</h1>
            <hr />
            <form onSubmit={handleRegister}>
                <div className="form my-3">
                    <label htmlFor="fname">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fname"
                        placeholder="Enter your first name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                    />
                </div>
                <div className="form my-3">
                    <label htmlFor="lname">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lname"
                        placeholder="Enter your last name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                    />
                </div>
                <div className="form my-3">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form my-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="text-center">
                    <button className="my-2 mx-auto btn btn-dark" type="submit">
                        Register
                    </button>
                </div>
                {message && <p className="text-success mt-2">{message}</p>}
                {error && <p className="text-danger mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default Register;
