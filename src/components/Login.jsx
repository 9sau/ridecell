import React, { Component } from 'react';
import HttpService from '../services/HttpService';

class Login extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password: "",
            error:{
                showError:false,
                message:''
            }
        };
        this.http = new HttpService();
        this.onLogin = this.onLogin.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onForgotPassword =this.onForgotPassword.bind(this);
    }

    onLogin(e){
        e.preventDefault();
        console.log(this.state);
        this.http.login(this.state.email, this.state.password)
            .then(res => res.json())
            .then(res => {
                if(res && res.error_code === 400){
                    console.log('error', res);
                    this.setState({
                        error:{
                            showError: true,
                            message:res.message
                        }
                    });
                }else{
                    console.log('success', res);
                    this.props.history.push("/account");
                }
            }, error => {
                console.log(error);
            })
            .catch(e=>{
                console.log(e);
            });
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
            this.setState({
                error:{
                    showError: true,
                    message:'Please enter email.'
                }
            });
            return;
        }
        this.http.forgotPassword(this.state.email, this.state.password)
            .then(res => res.json())
            .then(res => {
                console.log(res);
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
                <h3 className="margin-top-10">Welcome! Please login to continue</h3>
                <form>
                    <div className="form-wrapper">
                        {
                            this.state.error.showError ?
                                <div className="alert alert-danger" role="alert">
                                    {this.state.error.message}
                                </div> : null
                        }
                        <div className="form-group">
                            <input className="form-control" required type="text" name="email" placeholder="Email"  
                                onChange={this.onEmailChange}
                                pattern="[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}"
                            />
                        </div>
                        <div className="form-group">
                            <input className="form-control" required type="password" name="password"
                                placeholder="Password" onChange={this.onPasswordChange}/>
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