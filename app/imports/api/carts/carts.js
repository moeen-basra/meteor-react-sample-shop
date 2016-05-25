import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {Class} from 'meteor/jagi:astronomy'

export const Carts = new Mongo.Collection('carts')

export const Cart = Class.create({
    name: 'Cart',
    collection: Carts,
    fields: {
        productRef: {
            type: String,
        },
        enabled: {
            type: Boolean,
            default: true
        }
    },
    behaviors: {
        timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
            hasUpdatedField: true,
            updatedFieldName: 'updatedAt'
        }
    }
});

