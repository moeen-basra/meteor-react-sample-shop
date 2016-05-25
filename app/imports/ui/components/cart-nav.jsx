import {Meteor} from 'meteor/meteor'
import React, {Component, PropTypes} from 'react'
import {createContainer} from 'meteor/react-meteor-data'
import {Link} from 'react-router'

import {Cart} from '../../api/carts/carts'

export class CartNav extends Component {
    constructor(props){
        super(props);
        this.state = {items: 0}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({items: nextProps.items})
    }

    componentWillMount() {
        this.setState({items: this.props.items})
    }

    render() {
        return <Link to="/cart" >Cart <i className="badge badge-primary">{this.state.items && this.state.items}</i> </Link>
    }
}


CartNav.displayName = 'Tournaments List';

CartNav.propTypes = {
    loading: PropTypes.bool.isRequired,
    items: PropTypes.number.isRequired

};

CartNav.contextTypes = {
    router: PropTypes.object,
};

export default createContainer(() => {
    const listHandle = Meteor.subscribe('carts'),
        loading = !(listHandle.ready()),
        items = Cart.find({}, {sort:{createdAt:-1}}).count(),
        itemsExists = !loading && !!items;
    return { loading, items, itemsExists }
}, CartNav);
