import {Meteor} from 'meteor/meteor'
import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import {createContainer} from 'meteor/react-meteor-data'
import {Product} from '../../../api/products/products'
import {Cart} from '../../../api/carts/carts'

import Alert from 'react-s-alert'

class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.sate = {product: {}}
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
                        Alert.success('Added!')
                    }
                })
            }
        })
    }

    removeFromCart() {
        let {product} = this.props
        const cart = Cart.findOne({'productRef': product._id})
        cart.remove((error) => {
            if(error) {
                Alert.error(error.reason)
            }
            else {
                product.enabled = true
                product.save((error) => {
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

    componentWillReceiveProps(nextProps) {
        let {product} = nextProps
        this.setState({product: product})
    }

    componentWillMount() {
        let {product} = this.props
        this.setState({product: product})
    }

    renaderCartButton() {
        let {product} = this.state
        if(product.enabled) {
            return <button className="btn btn-warning btn-xs pull-right"
                           onClick={this.moveToCart.bind(this)}>
                <i className="fa fa-shopping-cart"></i> Add To Cart
                </button>
        }
        else {
            return <button className="btn btn-danger btn-xs pull-right"
                onClick={this.removeFromCart.bind(this)}>
                <i className="fa fa-shopping-cart"></i> Remove From Cart
                </button>
        }
    }

    render() {
        const style = {
            marginTop: "70px"
        }
        let {loading, productExists} = this.props
        let {product} = this.state

        if (loading) {
            return <div className="text-center">
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i>
            </div>
        }
        else if (!productExists) {
            return <div className="col-md-12">
                <p className="text-danger">404 Error</p>
            </div>
        }

        return <div className="container" style={style}>
            <div className="products">
                <div className="col-sm-3">
                    <img src={product.image} style={{width: "100%"}}/>
                </div>
                <div className="col-sm-9">
                    <h3>{product.name}
                        <small className="pull-right"i>$ {product.price}</small>
                    </h3>
                    <p>{product.description}</p>
                    <p style={{marginTop:"30px"}}>
                        <button className="btn btn-primary btn-xs" onClick={() => (browserHistory.push('/products'))}>Back</button>
                        {this.renaderCartButton()}
                    </p>
                </div>
            </div>
        </div>
    }
}

ProductDetail.propTypes = {
    loading: PropTypes.bool.isRequired,
    productExists: PropTypes.bool.isRequired,
    product: PropTypes.object.isRequired
}

export default createContainer(({params: {id}}) => {
    const productHandle = Meteor.subscribe('productWithCart', id),
        loading = !productHandle.ready(),
        product = Product.findOne(id),
        productExists = !loading && !!product
    return {loading, product, productExists}
}, ProductDetail);

ProductDetail.contextTypes = {
    router: PropTypes.object
};