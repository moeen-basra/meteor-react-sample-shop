import {Meteor} from 'meteor/meteor'
import React, {Component, PropTypes} from 'react'
import {createContainer} from 'meteor/react-meteor-data'
import {Link} from 'react-router'
import Alert from 'react-s-alert'

export class ListItem extends Component{
    constructor(props) {
        super(props)
    }

    removeFromCart() {
        let {cart, product} = this.props
        product.enabled = true
        product.save((error) => {
            if(error) {
                Alert.error(error.reason)
            }
            else {
                cart.remove((error) => {
                    if(error) {
                        Alert.error(error.reason)
                    }
                    else {
                        Alert.success('Removed!')
                    }
                })
            }
        })

    }

    handleCheckout() {
        let {cart, product} = this.props
        cart.remove((error) => {
            if(error) {
                Alert.error(error.reason)
            }
            else {
                product.remove((error) => {
                    if(error) {
                        Alert.error(error.reason)
                    }
                    else {
                        Alert.success('Thank you for your business')
                    }
                })
            }
        })
    }

    renderList() {
        let {cart, product} = this.props;
        return <div className="col-md-3 col-sm-4 col-xs-6">
            <img src={product.image} width="100%" className="img-responsive" />
            <p>$ {product.price}</p>
            <p>
                <button onClick={this.removeFromCart.bind(this)} className="btn btn-warning btn-xs">
                    <i className="fa fa-times"></i> Remove
                </button>
                <button onClick={this.handleCheckout.bind(this)} className="btn btn-warning btn-xs pull-right">
                    <i className="fa fa-credit-card"></i> Checkout
                </button>
            </p>
        </div>
    }

    renderLoader() {
        return <div className="text-center">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i>
        </div>
    }

    render() {
        const {cart} = this.props;

        return cart ? this.renderList() : this.renderLoader();
    }
}

ListItem.displayName = 'Cart Product'

ListItem.contextTypes = {
    router: PropTypes.object
};

ListItem.propTypes = {
    cart: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
};
