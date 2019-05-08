const assert = require('assert');
const should = require('chai').should();

describe('Basic Mocha Test', () => {
    it('should deal with objects', () => {
        const obj = {name: 'jon', gender: 'man'};
        const objB = {name: 'jon', gender: 'man'};

        obj.should.deep.equal(objB);
    });
    it('should allow testing nulls', () => {
        const iAmNull = null;
        should.exist(iAmNull);
    })
});
