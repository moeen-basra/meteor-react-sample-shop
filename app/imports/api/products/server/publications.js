// publications are used to publish data from server to client

import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo'

import { Products } from '../products'
import { Carts } from '../../carts/carts'

Meteor.publish('products', function() {
    return Products.find({}, {});
})

Meteor.publish('enabledProducts', function () {
    return Products.find({
        enabled: true
    }, {})
})

Meteor.publish('product', function(id) {
    return Products.find({'_id': id}, {});
})

Meteor.publishComposite('productWithCart', {
    find: function() {
        return Products.find({}, {
            sort: { createdAt: -1 }
        })
    },
    children: [
        {
            find: function(product) {
                return Carts.find({ 'productRef': product._id });
            }
        }
    ]
})