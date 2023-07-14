import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate } from 'react-router-dom';
import "../style/loginpage.css";
import { _BASE_URL } from "../services/constants";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: _BASE_URL,
});

const LoginPage = () => {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [loginFormErrors, setLoginFormErrors] = useState({});
  const [registrationFormErrors, setRegistrationFormErrors] = useState({});

  useEffect(() => {
    client.get("auth/user/")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function updateFormBtn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function validateLoginForm() {
    const errors = {};

    if (!username) {
      errors.username = "Username is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setLoginFormErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function validateRegistrationForm() {
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
    }

    if (!username) {
      errors.username = "Username is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    if (!password2) {
      errors.password2 = "Password does not match";
    }

    if (password !== password2) {
      errors.password2 = "Passwords do not match";
    }

    if (!first_name) {
      errors.first_name = "First Name is required";
    }

    if (!last_name) {
      errors.last_name = "Last Name is required";
    }

    setRegistrationFormErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function submitLogin(e) {
    e.preventDefault();

    if (validateLoginForm()) {
      client.post(
        "auth/login/",
        {
          username: username,
          password: password
        }
      ).then(function (res) {
        setCurrentUser(true);
        localStorage.setItem('token', res.data.access);
        return <Navigate to="/" />;
      }).catch(function (error) {
        if (error.response && error.response.status === 401) {
          setLoginFormErrors({ login: "Invalid username or password" });
        }
      });
    }
  }

  function submitRegistration(e) {
    e.preventDefault();

    if (validateRegistrationForm()) {
      client.post(
        "auth/register/",
        {
          email: email,
          username: username,
          password: password,
          password2: password2,
          first_name: first_name,
          last_name: last_name
        }
      ).then(function (res) {
        client.post(
          "auth/login/",
          {
            username: username,
            password: password
          }
        ).then(function (res) {
          setCurrentUser(true);
          localStorage.setItem('token', res.data.access);
          return <Navigate to="/" />;
        });
      });
    }
  }

  if (currentUser) {
    return (
      <>
        <Navigate to="/" />;
      </>
    );
  }

  return (
    
      <div className="center">
        <div className="login-container">
      <Navbar className='form_change'>
        <Container>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button className="form_btn" id="form_btn" onClick={updateFormBtn} variant="light">
                {registrationToggle ? 'Old Customer?\nLogin' : 'New customer?\nRegister'}
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        {registrationToggle ? (
          <Form onSubmit={submitRegistration} className="login-form">
            <h1>Welcome to EZE</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={registrationFormErrors.email}
              />
              <Form.Control.Feedback className="error" type="invalid">
                {registrationFormErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
            
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={registrationFormErrors.username}
              />
              <Form.Control.Feedback className="error" type="invalid">
                {registrationFormErrors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
          
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={registrationFormErrors.password}
              />
              <Form.Control.Feedback className="error" type="invalid">
                {registrationFormErrors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword2">
             
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                isInvalid={registrationFormErrors.password2}
              />
              <Form.Control.Feedback className="error" type="invalid">
                {registrationFormErrors.password2}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
             
              <Form.Control
                type="text"
                placeholder="First name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                isInvalid={registrationFormErrors.first_name}
              />
              <Form.Control.Feedback className="error" type="invalid">
                {registrationFormErrors.first_name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
             
              <Form.Control
                type="text"
                placeholder="Last name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                isInvalid={registrationFormErrors.last_name}
              />
              <Form.Control.Feedback className="error" type="invalid">
                {registrationFormErrors.last_name}
              </Form.Control.Feedback>
            </Form.Group>
            <Button className="register_btn" variant="primary" type="submit">
              Register
            </Button>
          </Form>
        ) : (
          <Form onSubmit={submitLogin} className="login-form">
            <h1>Customer login</h1>
            <Form.Group className="mb-3" controlId="formBasicUsername">
         
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={loginFormErrors.username}
              />
              <Form.Control.Feedback type="invalid" className="error">
                {loginFormErrors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
          
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={loginFormErrors.password}
              />
              <Form.Control.Feedback  className="error" type= "invalid">
                {loginFormErrors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button className="register_btn" variant="primary" type="submit">
              Login
            </Button>
            {loginFormErrors.login && (
              <div className="error_text">{loginFormErrors.login}</div>
            )}
          </Form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
