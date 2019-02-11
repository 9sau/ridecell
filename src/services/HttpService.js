class HttpService {
    login = (email, password) => {
        let body = {
            email:email,
            password:password
        }

        let headers = {
            'Content-type': 'application/json'
        }
        return this.callfetch('/api/v2/people/authenticate', 'POST', headers, body);
    }

    getUserByKey = (key) => {
        let headers = {
            'Authorization': localStorage.getItem('token')
        }

        let url = '/api/v2/people/' + key;
        return this.callfetch(url, 'GET', headers, null);
    }

    getUser = () => {
        let headers = {
            'Authorization': localStorage.getItem('token')
        };

        return this.callfetch('/api/v2/people', 'GET', headers, null);
    }

    register = (display_name, email, password) => {
        let body = {
            display_name: display_name,
            email: email,
            password: password,
        };

        let headers = {
            'Content-type': 'application/json'
        }

        return this.callfetch('/api/v2/people/create', 'POST', headers, body);
    }

    authenticate = (email, password) => {
        let body = {
            email: email,
            password: password,
        };

        let headers = {
            'Content-type': 'application/json'
        };

        return this.callfetch('/api/v2/people/authenticate', 'POST', headers, body);
    }

    getPasswordRequirements = () => {
        return this.callfetch('/api/v2/people/password_requirements', 'GET', null, null);
    }

    resetPassword = (email) => {
        let body = {
            email:email
        }

        let headers = {
            'Content-type': 'application/json'
        }

        return this.callfetch('/api/v2/people/reset_password', 'POST', headers, body);
    }

    callfetch = (endpoint, method, headers, body) => {
        let options = {
            method:method
        }

        if(headers)
            options.headers = headers;
        if(body)
            options.body = JSON.stringify(body);

        var baseUrl = "https://evening-plateau-93775.herokuapp.com"
        return fetch(baseUrl + endpoint, options);
    }
}

export default HttpService