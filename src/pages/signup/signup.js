import React, { useState, useEffect } from "react";
import InputText from "../../components/inputFeild/input";
import './signup.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
export default function SignUp() {
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    // Data validation

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        rememberMe: ""
    })

    const [err, setErr] = useState({
        nameErr: null,
        emailErr: null,
        passErr: null,

    })

    function eventHandler(event) {
        // name validation
        let validation;
        if (event.target.placeholder === "Name:") {

            if (event.target.value.length > 5) {
                setData({
                    ...data,
                    name: event.target.value
                })

            }
            else {

                setErr({
                    ...err,
                    nameErr: event.target.value.length < 5 ?
                        "User name is too short" : null
                })


            }

        }
        // password validation
        else if (event.target.placeholder === "Password:") {
            // check if the password have the followinf conditions:
            // 1- have capital letter 
            // 2- have symbol and number 
            // 3- its length not less than 6 characters


            if (event.target.value.length > 6) {
                // alert(event.target.value.length)
                setData({
                    ...data,
                    password: event.target.value
                })


            }
            else {
                setErr({
                    ...err,
                    passErr: event.target.value.length < 6 ?
                        "Password is too short, it must be more than 6 characters" : null
                })

            }
        }
        // email validation
        else if (event.target.placeholder === "Email:") {
            let emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            let emailVal = emailValidation.test(event.target.value)
            console.log(emailVal)
            if (emailValidation.test(event.target.value)===true) {
                setData({
                    ...data,
                    email: event.target.value
                })
            }
            else {
                setErr({
                    ...err,
                    emailErr: emailVal === false ?
                        "Email is not valid , please enter valid email" : null
                })
            }

        }



        if (data.name !== '' && data.password !== '' && data.email !== '') {
            validation = true;
        }
        else {
            validation = false
        }

        return validation
    }


    function submit(e) {
        e.preventDefault()
        if (eventHandler(e)) {
            alert("sign up complete")
        }
        else {
            alert("please insert the data")
        }



    }
    return <div className="signInPage d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '100vh' }}>
        <h1 className="m-1">Sign up</h1>
        <form className="form-control m-1 w-50 d-flex flex-column justify-content-between " onSubmit={(e) => submit(e)}>
            <InputText placeholder="Name:" type="text" onChange={(e) => eventHandler(e)} />
            <small className="text-danger">{err.nameErr}</small>

            <InputText placeholder="Email:" type="email" onChange={(e) => eventHandler(e)} />
            <small className="text-danger">{err.emailErr}</small>

            <InputText placeholder="Password:" type="password" onChange={(e) => eventHandler(e)} />
            <small className="text-danger">{err.passErr}</small>

            <InputText placeholder="Confirm password:" type="password" onChange={(e) => eventHandler(e)} />
            <small className="text-danger">{err.passErr}</small>

            <div className=" remember ">

                <input type="checkbox" className="m-2 form-check-input" id="check" />
                <label htmlFor="remember-me" id="check" className=" ">Remember me</label>
            </div>

            <button type="submit" className="btn btn-dark">Sign in</button>
        </form>

    </div>




}

