import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import callApi from '../helper/api';
import './login.css';

export default function Login(){
    const history = useNavigate();
    const [userList, setUserList]:any = useState([]);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const [loginErr, setLoginErr] = useState('');
    const [errorData, setErrorData]:any = useState({});

    useEffect(() => {
        getUser();
    },[])

    async function getUser() {
        try {
            const response = await callApi('GET', '/data.json');
            const res = response.data.data;
            setUserList(res.user);
        } catch (error) {
          console.error(error);
        }
    }

    const validateForm = () => {
        let isError = false;
        let errorObj:any = {...errorData};
        if(!!!userId){
            isError = true;
            errorObj.userId = 'Please enter user id';
        }
        if(!!!password){
            isError = true;
            errorObj.userPass = 'Please enter password';
        }
        setErrorData(errorObj);
        return !isError;
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        let isValid = validateForm();

        if(isValid){
            let data = {
                'userName' :  userId,
                'password' :  password,
            }
            submitLoginForm(data);
            setUserId('');
            setPassword('');
        }
    }

    const submitLoginForm = (loginData:any) => {
        let userId = loginData.userName;
        let userPass = loginData.password;

        if(!!userList){
            let userLoginId = userList[0].loginId;
            let userLoginPass = userList[0].password;
            if (userId === userLoginId && userPass === userLoginPass){
                localStorage.setItem('pocLMReact', JSON.stringify(userList[0]));
                setLoginSuccess('Login Successful');
                history("/product-list");
            }else{
                setLoginErr('Login Failed');
            }
        }  
    }

    return(
        <>
            <div className="container-fluid login-page">  
                {
                    !!loginSuccess ? 
                        <div className="position-absolute m-2 alert-wrap">
                        <div className="alert alert-success m-0" role="alert">
                            {loginSuccess}
                        </div></div> : null
                }
                {
                    !!loginErr ? 
                        <div className="position-absolute m-2 alert-wrap">
                        <div className="alert alert-danger m-0" role="alert">
                            {loginErr}
                        </div></div> : null
                } 
                <div className="row">
                    <div className="col-12 col-sm-6 p-0">
                        <div className="left-part">
                            <h1>
                                Banty React Project
                            </h1>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 p-0">
                        <div className="right-part p-2">
                            <div className="logo-panel w-100 mb-5">
                                <img src="" alt="" title="" className="logo"></img>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    {
                                        !!errorData.userId ? 
                                            <div className="alert alert-danger m-0" role="alert">
                                                {errorData.userId}
                                            </div> : null
                                    }
                                    <label htmlFor="inputEmail" className="form-label">Email address</label>
                                    <input type="email" onChange={(e) => setUserId(e.target.value)} value={userId} 
                                        className="form-control" id="inputEmail" />
                                </div>
                                <div className="mb-4">
                                    {
                                        !!errorData.userPass ? 
                                            <div className="alert alert-danger m-0" role="alert">
                                                {errorData.userPass}
                                            </div> : null
                                    }
                                    <label htmlFor="inputPassword" className="form-label">Password</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} 
                                        className="form-control" id="inputPassword" />
                                </div>
                                <button type="submit" className="ds-btn ds-btn--primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}