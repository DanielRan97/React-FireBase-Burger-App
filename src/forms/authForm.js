const authForm = {

    authForm:{
        email: {
            elementType : 'input',
            elememntConfig : {
                type: 'email',
                placeholder: 'Mail Adress'
            },
            value: '',
            validation: {
                requierd: true,
                email: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType : 'input',
            elememntConfig : {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                requierd: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    },
    formIsValid : false,

};

export default authForm;