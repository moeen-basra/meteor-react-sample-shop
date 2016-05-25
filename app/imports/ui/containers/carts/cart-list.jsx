import {Meteor} from 'meteor/meteor'
import React, {Component, PropTypes} from 'react'
import {createContainer} from 'meteor/react-meteor-data'

import {Cart} from '../../../api/carts/carts'
import {Product} from '../../../api/products/products'

import {ListItem} from './list-item.jsx'

class CartList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const style = {
            marginTop: "50px"
        }
        let {loading, carts, cartsExists} = this.props;

        if(loading) {
            return <div className="text-center">
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i>
            </div>
        }
        else if(!cartsExists) {
            return <div className="col-md-12">
                <p className="text-danger">404 Error</p>
            </div>
        }
        let Items;

        if(!carts || !carts.length) {
            Items = (
                <div className="col-md-12">
                    <p className="text-warning">No Product Found</p>
                </div>
            );
        }
        else {
            Items = carts.map( (cart, index) => (
                <ListItem key={cart._id} cart={cart} product={Product.findOne(cart.productRef)} index={index} />
            ));
        }
        return <div className="container" style={style}>
                <div className="products">{Items}</div>
            </div>
    }
}

CartList.displayName = 'Cart List';

CartList.propTypes = {
    loading: PropTypes.bool.isRequired,
    carts: PropTypes.array.isRequired
};

CartList.contextTypes = {
    router: PropTypes.object,
};

// this is data container here we load all our data from database and pass that to our class
export default createContainer(() => {
    const listHandle = Meteor.subscribe('cartsWithProduct'),
        loading = !(listHandle.ready()),
        carts = Cart.find({}, {sort:{createdAt:-1}}).fetch(),
        cartsExists = !loading && !!carts
    return { loading, carts, cartsExists }
}, CartList);