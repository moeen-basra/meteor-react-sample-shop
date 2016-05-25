import {Meteor} from 'meteor/meteor';
import {Product} from '../../api/products/products';
import faker from 'faker';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
    if(Meteor.users.find().count() === 0) {
        const data = [
            {
                username: 'moeen',
                email: 'm.basra@live.com',
                password: '123'
            }
        ];

        data.forEach((user) => {
            Accounts.createUser({
                email: user.email,
                password: user.password,
                username: user.username
            });
        });
    }

    if (Product.find().count() === 0) {
        var PRODUCT_COUNT = 10;
        var products = [];
        for(var i=0; i<PRODUCT_COUNT; i++) {
            const productId = new Product({
                name: faker.commerce.productName(),
                price:faker.commerce.price(),
                image: faker.image.image(),
                description: faker.lorem.sentence()
            }).save();
        }
    }
});
