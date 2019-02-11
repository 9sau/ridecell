import React, { Component } from 'react';
import HttpService from '../services/HttpService';

class Account extends Component{
    constructor(props){
        super(props);
        this.http = new HttpService();
        this.toggle = false;
        this.state = {
            showPanel: this.toggle,
            error: {
                showError:false,
                message:''
            },
            success: {
                showSuccess:false,
                message:''
            },
            account: {
                created_at: '',
                display_name: '',
                email: '',
                updated_at: '',
                key: '',
                role: null
            }
        }
        this.person = this.props.location.state.data;
        this.onToggle = this.onToggle.bind(this);
        this.onResetPassword = this.onResetPassword.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount(){
        this.http.getUserByKey(this.person.key)
        .then(res => res.json())
        .then(res => {
            if(res && res.error_code === 400){
                this.changeState('error', { showError: true,  message: res.message });
                this.changeState('success', { showSuccess: false,  message: '' });
            }else{
                this.changeState('error', { showError: false,  message: '' });
                this.changeState('success', { showSuccess: true,  message: res });
                
            }
        }, error => {
            this.changeState('error', { showError: true,  message: 'Server is not responding. Please try again later'});
            this.changeState('success', { showSuccess: false,  message: '' });
        })
        .catch(e=>{
            this.changeState('error', { showError: true,  message: 'Server is not responding. Please try again later'});
            this.changeState('success', { showSuccess: false,  message: '' });
        });
    }

    onLogout(){
        localStorage.removeItem('token');
        this.props.history.push('/');
    }

    onResetPassword(){
        this.http.resetPassword(this.state.account.email)
        .then(res => res.json())
        .then(res => {
            if(res && res.error_code === 400){
                this.changeState('error', { showError: true,  message: res.message });
                this.changeState('success', { showSuccess: false,  message: '' });
            }else{
                this.changeState('error', { showError: false,  message: '' });
                this.changeState('success', { showSuccess: true,  message: res.message });
            }
        }, error => {
            this.changeState('error', { showError: true,  message: 'Server is not responding. Please try again later'});
            this.changeState('success', { showSuccess: false,  message: '' });
        })
        .catch(e=>{
            this.changeState('error', { showError: true,  message: 'Server is not responding. Please try again later'});
            this.changeState('success', { showSuccess: false,  message: '' });
        });
    }

    onToggle(e){
        this.toggle = !this.toggle;
        this.setState({
            showPanel:this.toggle
        });
    }

    changeState(prop, value){
        let options = {}
        options[prop] = value;
        this.setState(options);          
    }

    renderDate(date){
        if(!date)
            return;
        let today = new Date();
        let other = new Date(date);
        let diff = today.getTime() - other.getTime();
        let secs = diff/1000;
        let mins = secs/60;
        
        let hrs = mins/60;
        if(hrs < 24)
            return 'Today.';
        let days = hrs/24;
        if(days < 30)
            return parseInt(days) + ' days ago.'
        let months = days/30;
        if(months <= 12)
            return parseInt(months) + ' months ago.'
    }

    render(){

        return(
            <div>
                <div className={this.state.showPanel ? 'margin-right-250' : ''}>
                    <div className="profile">
                        <button className="btn btn-success" onClick={this.onToggle}>{this.state.account.display_name}</button>
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
                <div className={this.state.showPanel ? 'side-panel slide': 'side-panel'}>
                    <p>{this.state.account.display_name}</p>
                    <p>{this.state.account.email}</p>
                    <p>Account Age: { this.renderDate(this.state.account.created_at)}</p>
                    <p>Security</p>
                    <p>Last Updated: {this.renderDate(this.state.account.updated_at)}</p>
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