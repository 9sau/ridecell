import React, { Component } from 'react';
import HttpService from '../services/HttpService';

class SignUp extends Component{
    constructor(){
        super();
        this.state = {
            display_name:'',
            email:'',
            password: '',
            confirmPassword: '',
            error: {
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
                //Store the response
            }, error => {
                this.changeState('error', { showError: true,  message: 'Some thing went wrong, Please try again later!'});
            })
            .catch(e=>{
                this.changeState('error', { showError: true,  message: 'Some thing went wrong, Please try again later!'});
            });
      }
    
    validate(){
        let message = 'Please enter';
        let isOk = true;

        if(this.state.display_name === ''){
            message += ' Name,';
            isOk = false;
        }
        if(this.state.email === ''){
            message += ' Email,';
            isOk = false;
        }
        if(this.state.password === ''){
            message += ' Password,';
            isOk = false;
        }
        if(this.state.confirmPassword === ''){
            message += ' Confirm Password,';
            isOk = false;
        }
        
        if(message[message.length-1] === ',')
            message = message.slice(0, -1);

        if(this.state.password !== this.state.confirmPassword){
            message = 'Passwords do not match!'
            isOk = false;
        }
        
        return { isOk: isOk, message: message} ;
        
    }

    onSignUp(e){
        e.preventDefault();

        let result = this.validate();
        
        if(result && !result.isOk){
            this.changeState('error', { showError: true,  message: result.message});
            return;
        }

        this.http.register(this.state.display_name, this.state.email, this.state.password)
            .then(res => res.json())
            .then(res => {
                if(res && res.error_code === 400){
                    this.changeState('error', { showError: true,  message: res.message});
                }else{
                    localStorage.setItem('token', res.authentication_token);
                    this.props.history.push("/account");
                }
            }, error => {
                this.changeState('error', { showError: true,  message: 'Some thing went wrong, Please try again later!'});
            })
            .catch(e => {
                this.changeState('error', { showError: true,  message: 'Some thing went wrong, Please try again later!'});
            });
    }

    onNameChange(e){
        this.changeState('display_name', e.target.value);
    }

    onEmailChange(e){
        this.changeState('email', e.target.value);
    }

    onPasswordChange(e){
        this.changeState('password', e.target.value);
    }
    
    onConfirmPasswordChange(e){
        this.changeState('confirmPassword', e.target.value);
    }

    changeState(prop, value){
        let options = {}
        options[prop] = value;
        this.setState(options);          
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