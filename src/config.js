const config = {
    login:[{
        type:'text',
        field:'email',
        placeholder:'Email',
        onChange: 'onEmailChange',
        required:true,
        pattern:'[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}'
    }, {
        type:'password',
        field:'password',
        placeholder:'Password',
        onChange: 'onPasswordChange',
        required:true,
        pattern:''
    }, {
        type:'submit',
        field:'login',
        placeholder:'',
        value:'Login',
        onClick:'onLogin',
        pattern:''
    }],
    signup:[{
        type:'text',
        field:'displayName',
        placeholder:'Display Name',
        onChange: 'onNameChange',
        required:true,
        pattern:'',
    }, {
        type:'text',
        field:'email',
        placeholder:'Email',
        onChange: 'onEmailChange',
        required:true,
        pattern:'[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}'
    }, {
        type:'password',
        field:'password',
        placeholder:'Password',
        onChange: 'onPasswordChange',
        required:true,
        pattern:''
    }, {
        type:'password',
        field:'confirmPassword',
        placeholder:'Password Again',
        onChange: 'onConfirmPasswordChange',
        required:true,
        pattern:''
    }, {
        type:'submit',
        field:'signUp',
        placeholder:'',
        value:'Sign Up',
        onClick:'onSignUp',
        pattern:''
    }
]};
export default config;