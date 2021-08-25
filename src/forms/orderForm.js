const orderForm = {
    
    orderForm: {
            name: {
                elementType : 'input',
                elememntConfig : {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    requierd: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType : 'input',
                elememntConfig : {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    requierd: true,
                    email: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType : 'input',
                elememntConfig : {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    requierd: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType : 'input',
                elememntConfig : {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    requierd: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType : 'input',
                elememntConfig : {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    requierd: true,
                    minLength: 5,
                    maxLength: 5,
                    postalCode: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType : 'select',
                elememntConfig : {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'cheapest',
                valid: true,
                touched: false
            }
        },
        formIsValid : false
    };

export default orderForm;

    
