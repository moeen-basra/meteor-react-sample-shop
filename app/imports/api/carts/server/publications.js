import { Meteor } from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'

import { Carts } from '../carts'
import { Products } from '../../products/products'

Meteor.publish('carts', function() {
    return Carts.find({}, {})
})

Meteor.publishComposite('cartsWithProduct', {
    find: function() {
        return Carts.find({}, {
            sort: { createdAt: -1 }
        })
    },
    children: [
        {
            find: function(cart) {
                return Products.find({ _id: cart.productRef });
            }
        }
    ]
})

Meteor.publish('cartWithProductRef', function (id) {
    return Carts.find({'productRef': id}, {})
})

Meteor.publish('cart', function(id) {
    return Carts.find({'_id': id}, {})
})
