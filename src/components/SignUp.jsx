import React, { Component } from 'react';
import HttpService from '../services/HttpService';

class SignUp extends Component{
    baseUrl = "https://evening-plateau-93775.herokuapp.com"
    loginUrl = "/api/v2/people/create";
    passwordUrl = "/api/v2/people/password_requirements";
    constructor(){
        super();
        this.state = {
            display_name:'',
            email:'',
            password: '',
            confirmPassword: '',
            error:{
                showError:false,
                message:''
            }
        };
        this.http = new HttpService();
        this.onSignUp = this.onSignUp.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    }

    componentDidMount() {
        this.http.getPasswordRequirements()
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
    
    onSignUp(e){
        e.preventDefault();
        console.log(this.state);
        this.http.register(this.state.display_name, this.state.email, this.state.password)
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
                    localStorage.setItem('token', res.authentication_token);
                    this.props.history.push("/account");
                }
            }, error => {
                this.setState({
                    error:{
                        showError: true,
                        message: 'Server is not responding. Please try again later'
                    }
                });
            })
            .catch(e=>{
                this.setState({
                    error:{
                        showError: true,
                        message: 'Server is not responding. Please try again later'
                    }
                });
            });
    }

    onNameChange(e){
        this.setState({
            display_name: e.target.value
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
    
    onConfirmPasswordChange(e){
        this.setState({
            confirmPassword: e.target.value
        });
    }

    render(){
        return(
            <div>
                <h3 className="margin-top-10">Please tell us a little about you!</h3>
                <span>{this.state.errorMessage}</span>
                <form>
                    <div className="form-wrapper">
                        {
                            this.state.error.showError ?
                                <div className="alert alert-danger" role="alert">
                                    {this.state.error.message}
                                </div> : null
                        }
                        <div className="form-group">
                            <input className="form-control" type="text" required name="displayName" placeholder="Display Name"
                                required onChange={this.onNameChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" required name="email" placeholder="Email" required
                                onChange={this.onEmailChange}
                                pattern="[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" required name="password" placeholder="Password" required
                                onChange={this.onPasswordChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" required name="confirmPassword"
                                placeholder="Password Again" required onChange={this.onConfirmPasswordChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="submit" required value="Sign Up" onClick={this.onSignUp}/>
                        </div>
                        <div className="form-group">
                            <a href="/login">Login</a>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUp