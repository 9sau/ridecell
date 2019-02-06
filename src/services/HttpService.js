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

    getUserByKey = (email, key) => {
        let body = {
            email:email,
        }

        let headers = {
            'Authorization': ''
        }

        let url = '/api/v2/people/reset_password/' + key;
        return this.callfetch(url, 'GET', headers, body);
    }

    getUser = (email) => {
        let body = {
            email:email,
        };

        let headers = {
            'Authorization': ''
        };

        return this.callfetch('/api/v2/people/reset_password', 'GET', headers, body);
    }

    register = (display_name, email, password) => {
        let body = {
            display_name: display_name,
            email: email,
            password: password,
        };

        return this.callfetch('/api/v2/people/create', 'POST', null, body);
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

    forgotPassword = (email) => {
        let body = {
            email:email,
        }

        let headers = {
            'Content-type': 'application/json'
        }
        return this.callfetch('/api/v2/people/reset_password', 'GET', headers, body);
    }

    getPasswordRequirements = () => {
        return this.callfetch('/api/v2/people/password_requirements', 'GET', null, null);
    }

    managePassword = (email) => {
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