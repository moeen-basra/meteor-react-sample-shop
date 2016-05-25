//this is the collection for products using the jagi:astronomy package to manage the collections data
//here are the docs for jagi collections http://jagi.github.io/meteor-astronomy/

import {Meteor} from 'meteor/meteor'
import {Mongo} from 'meteor/mongo'
import {Class} from 'meteor/jagi:astronomy'

export const Products = new Mongo.Collection('products');

export const Product = Class.create({
    name: 'Product',
    collection: Products,
    fields: {
        name: {
            type: String,
            validators: [{
                type: 'minLength',
                param: 2,
                message: 'Too short'
            }, {
                type: 'maxLength',
                param: 60,
                message: 'Too long'
            }]
        },
        price: {
            type: String
        },
        image: {
            type: String
        },
        description: {
            type: String,
            validators: [{
                type: 'minLength',
                param: 2,
                message: 'Too short'
            }, {
                type: 'maxLength',
                param: 160,
                message: 'Too long'
            }]
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

