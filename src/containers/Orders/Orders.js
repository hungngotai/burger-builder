import React, { Component } from 'react'
import axios from '../../axios-orders'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import * as actionCreators from '../../store/actions'

class Orders extends Component {
  componentDidMount () {
    this.props.onFetchOrders(this.props.token, this.props.userId)
  }

  render () {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
                <Order key={order.id} ingredients={order.ingredients} price={order.price} />
              ))
    }
    return (
      <div>
        {orders}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId: state.auth.idUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actionCreators.fetchOrders(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))
