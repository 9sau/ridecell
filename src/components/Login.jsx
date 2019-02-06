import React, { Component } from 'react';
import HttpService from '../services/HttpService';

class Login extends Component{
    baseUrl = "https://evening-plateau-93775.herokuapp.com"
    loginUrl = "/api/v2/people/authenticate";
    forgotPasswordUrl = "/api/v2/people/reset_password";

    constructor(props){
        super(props);
        this.state = {
            email:"",
            password: "",
            errorMessage:"",
        }
        this.onLogin = this.onLogin.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onForgotPassword =this.onForgotPassword.bind(this);
    }

    onSignUp(e){
        console.log(this.state);
        e.preventDefault();
    }

    onLogin(e){
        e.preventDefault();
        console.log(this.state);
        let obj = Object.create(this.state);

        for(let key in obj){
            if(obj[key] === ''){
                // TO DO error out
                return;
            }
        }
        
        let body = {
            email:this.state.email,
            password:this.state.password
        }

        let options = {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        
        this.callFetch(this.loginUrl, options);
       
        e.preventDefault();
    }

    onEmailChange(e){
        this.setState({
            email: e.target.value
        });
    }

    onPasswordChange(e){
        this.setState({
            password: e.target.value
        });
    }

    onForgotPassword(e) {
        e.preventDefault();
        if(this.state.email === ''){
            // TO DO show error
            return;
        }
        let body = {
            email: this.state.email
        }

        let options = {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        this.callFetch(this.forgotPasswordUrl, options);
    }

    callFetch(endpoint, options) {
        fetch(this.baseUrl+endpoint, options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                /* this.setState({
                    success:res
                }) */
            }, error => {
                console.log(error);
            })
            .catch(e=>{
                console.log(e);
            });
    }

    render(){
        return(
            <div className="center">
                <h3 className="margin-top-10">Welcome!Please login to continue</h3>
                <span>{this.state.errorMessage}</span>
                <form>
                    <div className="form-wrapper">
                        <div className="form-group">
                            <input className="form-control" required type="text" name="email" placeholder="Email"  
                                onChange={this.onEmailChange}
                                pattern="[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}"
                            />
                        </div>
                        <div className="form-group">
                            <input className="form-control" required type="password" name="password"
                                placeholder="Password"  onChange={this.onPasswordChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" required type="submit" value="Login"
                                onClick={this.onLogin}/>
                        </div>
                        <div className="form-group">
                            <a href="/signup">Sign Up</a>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary"
                                onClick={this.onForgotPassword}>Forgot Password
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login