import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'
import * as actions from '../actions'

class Payment extends React.Component {
    render(){
        return <StripeCheckout
            name="emaily"
            description="5 rupees for 5 credits"
            token={(token) => this.props.sendToken(token)}
            currency='inr'
            amount={500}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
        ><button className="btn">Add Credits</button></StripeCheckout>
    }
}

export default connect(null,actions)(Payment)