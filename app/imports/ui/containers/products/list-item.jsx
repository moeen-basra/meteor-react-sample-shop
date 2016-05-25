import {Meteor} from 'meteor/meteor'
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

import {Cart} from '../../../api/carts/carts'

import Alert from 'react-s-alert'

export class ListItem extends Component{
    constructor(props) {
        super(props)
    }

    moveToCart() {
        let {product} = this.props
        let cart = new Cart({
            productRef: product._id
        })
        cart.save((error) => {
            if(error) {
                Alert.error(error.reason)
            }
            else {
                product.enabled = false
                product.save((error) => {
                    if(error) {
                        Alert.error(error.reason)
                    }
                    else {
                        Alert.success('Success!')
                    }
                })
            }
        })
    }

    renderList() {
        let {product} = this.props;
        return <div className="col-md-3 col-sm-4 col-xs-6">
            <img src={product.image} width="100%" className="img-responsive" />
            <p>$ {product.price}</p>
            <p>
                <Link to={`/products/${product._id}`} className="btn btn-primary btn-xs">
                    <i className="fa fa-eye"></i> Details
                </Link>
                <button onClick={this.moveToCart.bind(this)}
                        className="btn btn-warning btn-xs pull-right">
                    <i className="fa fa-shopping-cart"></i> Add To Cart
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
        const {product} = this.props;

        return product ? this.renderList() : this.renderLoader()
    }
}

ListItem.displayName = 'Product'

ListItem.propTypes = {
    product: PropTypes.object.isRequired
};

ListItem.contextTypes = {
    router: PropTypes.object
};