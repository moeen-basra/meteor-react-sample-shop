import {Meteor} from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data'

import {Product} from '../../../api/products/products'

import {ListItem} from './list-item.jsx'

class ProductList extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const style = {
            marginTop: "50px"
        }
        let {loading, products, productsExists} = this.props;

        if(loading) {
            return <div className="text-center">
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i>
            </div>
        }
        else if(!productsExists) {
            return <div className="col-md-12">
                <p className="text-danger">In</p>
            </div>
        }
        let Items;

        if(!products || !products.length) {
            Items = (
                <div className="col-md-12">
                    <p className="text-warning">No Product Found</p>
                </div>
            );
        }
        else {
            Items = products.map(product => <ListItem key={product._id} product={product} />)
        }

        return <div className="container" style={style}>
                <div className="starter-template">
                    <h1>Welcome to Sample Cart</h1>
                    <p className="lead">
                        This product is the sample store with shopping cart using the following techs, <br />
                        React 15+, Meteor 1.3 + and Mongodb
                    </p>
                </div>
                <div className="products">{Items}</div>
            </div>
    }
}

ProductList.displayName = 'Tournaments List'

ProductList.propTypes = {
    loading: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired
};

ProductList.contextTypes = {
    router: PropTypes.object,
};

export default createContainer(() => {
    const listHandle = Meteor.subscribe('enabledProducts'),
        loading = !(listHandle.ready()),
        products = Product.find({}, {sort:{createdAt:-1}}).fetch(),
        productsExists = !loading && !!products;
    return { loading, products, productsExists }
}, ProductList)