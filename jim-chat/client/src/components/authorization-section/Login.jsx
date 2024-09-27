import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap'
import JiMButton from '../../ui/JiMButton'
import { API_USER_LOGIN } from '../../constants/endpoints';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    async function handleSubmit() {
        try {
            // Headers
            let myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")

            // Body
            const body = {
                email: email,
                password: password,
            }

            // Request Options
            const requestOption = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body),
            }

            // Send Request
            const response = await fetch(API_USER_LOGIN, requestOption)

            // Get Response
            const data = await response.json()

            // Update Token
            props.updateToken(data.token)

            // Navigate to Main
            navigate("/feed/" + data.user._id)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className='login-form'>
                <Form>
                    {/* EMAIL */}
                    <FormGroup>
                        <Input 
                            id='email'
                            name='email'
                            placeholder='Email Address'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>

                    {/* PASSWORD */}
                    <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input
                            id='password'
                            name='password'
                            placeholder='Enter Password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>

                    <JiMButton title='Login' onClick={handleSubmit} />
                    
                </Form>
            </div>
        </>
    )
}

export default Login