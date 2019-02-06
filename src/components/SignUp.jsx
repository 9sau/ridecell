import React, { Component } from 'react';

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
            confirmPassword: ''
        };

        this.onSignUp = this.onSignUp.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    }

    componentWillMount() {
        fetch(this.baseUrl+this.passwordUrl)
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
        console.log(this.state);

        if(this.state.password !== this.state.confirmPassword){
            //TO DO error out
            return
        }

        let obj = Object.create(this.state);

        for(let key in obj){
            if(obj[key] === ''){
                //TO DO error out
                return
            }
        }

        let body = {
            email:this.state.email,
            password:this.state.password,
            display_name:this.state.display_name
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
   
    callFetch(endPoint, options){
        fetch(this.baseUrl+this.loginUrl, options)
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
            <div>
                <h3 className="margin-top-10">Please tell us a little about you!</h3>
                <span>{this.state.errorMessage}</span>
                <form>
                    <div className="form-wrapper">
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