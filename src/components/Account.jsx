import React, { Component } from 'react';
import HttpService from '../services/HttpService';

class Account extends Component{
    constructor(){
        super();
        this.http = new HttpService();
        this.toggle = false;
        this.state = {
            email: '',
            showPanel: this.toggle,
            error:{
                showError:false,
                message:''
            },
            success:{
                showSuccess:false,
                message:''
            }
        }
        this.onToggle = this.onToggle.bind(this);
        this.onResetPassword = this.onResetPassword.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout(){
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }

    onResetPassword(){
        //this.http.resetPassword(this.state.email)
        this.http.resetPassword('saurabh@gmail.com') // change later
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
                    this.setState({
                        success:{
                            showSuccess: true,
                            message:res.message
                        }
                    });
                    console.log('success', res);
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

    onToggle(e){
        this.toggle = !this.toggle;
        this.setState({
            showPanel:this.toggle
        });
    }

    render(){

        return(
            <div>
                <div className={ this.state.showPanel ? 'margin-right-250' : ''}>
                    <div className="profile">
                        <button className="btn btn-success" onClick={this.onToggle}>Hello</button>
                    </div>
                    <div className="form-wrapper">
                        <h3>User Home Page</h3>
                        {
                            this.state.error.showError ?
                                <div className="alert alert-danger" role="alert">
                                    {this.state.error.message}
                                </div> : null
                        }
                        {
                            this.state.success.showSuccess ?
                            <div className="alert alert-success" role="alert">
                                {this.state.success.message}
                            </div> : null
                        }
                    </div>
                </div>
                <div className={this.state.showPanel ? 'side-panel slide': 'side-panel' }>
                    <p>Display Name</p>
                    <p>Email</p>
                    <p>Account Age: <span> 1 Day </span></p>
                    <p>Security</p>
                    <p>Last Updated: <span> 1 Day </span></p>
                    <div className="button">
                        <button className="btn btn-primary" onClick={this.onResetPassword}>Reset Password</button>
                    </div>
                    <div className="button">
                        <button className="btn btn-danger" onClick={this.onLogout}>Logout</button>
                    </div>
                </div>   
            </div>
        )
    }
}

export default Account