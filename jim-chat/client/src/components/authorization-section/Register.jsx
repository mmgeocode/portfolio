import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap'
import JiMButton from '../../ui/JiMButton';
import { API_USER_CREATE } from "../../constants/endpoints";
import { useNavigate } from 'react-router-dom';

function Register(props) {
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    async function handleSubmit(evt) {
        evt.preventDefault();

        try {
            // Headers
            let myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")

            // Body
            const body = {
                userName: userName,
                email: email,
                password: password,
            }

            // Request Options
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body),
            }

            // Send Request
            const response = await fetch(API_USER_CREATE, requestOptions)

            // Get Response
            const data = await response.json()

            // Update Token and CurrentId
            props.updateToken(data.token)
            props.updateCurrentId(data.user._id)

            // Navigate to Main
            navigate("/feed/" + data.user._id)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="register-form">
                <h2>Create New Account</h2>
                <Form>
                    {/* USERNAME */}
                    <FormGroup>
                        <Label for="exampleUsername">USER NAME</Label>
                        <Input
                            id='exampleUsername'
                            name='username'
                            placeholder='Enter Username Here'
                            type='username'
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormGroup>

                    {/* EMAIL */}
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input
                            id='exampleEmail'
                            name='email'
                            placeholder='Enter Email Here'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>

                    {/* PASSWORD */}
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                            id='examplePassword'
                            name='password'
                            placeholder='Enter Password Here'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>

                    <JiMButton title='Create' onClick={handleSubmit} />

                </Form>
            </div>
        </>
    )
}

export default Register