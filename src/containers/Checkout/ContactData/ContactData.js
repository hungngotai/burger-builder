import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid value!'
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid value!'
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid value!'
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid value!'
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
        errorMessage: 'Please enter a valid value!'
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fasted', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: '',
        valid: true,
        touched: true,
        errorMessage: ''
      }
    },
    formValid: false,
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true})
    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    console.log(formData)
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price.toFixed(2),
      orderData: formData

    }
    axios.post('/orders.json', order)
    .then(response => {
      this.setState({loading: false})
      this.props.history.push('/');
    })
    .catch(error => {
      this.setState({loading: false})
    })
  }

  checkValidity = (value, rules) => {
    let valid = true

    if(!rules) {
      return true
    }

    if(rules.required) {
      valid = value.trim() !== '' && valid
    }
    if(rules.minLength) {
      valid = value.length >= rules.minLength && valid
    }
    if(rules.maxLength) {
      valid = value.length <= rules.maxLength && valid
    }
    return valid
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedForm[inputIdentifier]
    }
    updatedFormElement.value = event.target.value
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedForm[inputIdentifier] = updatedFormElement

    let formValid = true
    for (let elementIdentifier in updatedForm) {
      formValid = updatedForm[elementIdentifier].valid && formValid
    }

    this.setState({orderForm: updatedForm, formValid: formValid})
  }

  render () {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
          {
            formElementArray.map(formElement => (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                errorMessage={formElement.config.errorMessage}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
              />
            ))
          }
          <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
      </form>
    )

    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;
