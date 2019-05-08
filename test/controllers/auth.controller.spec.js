const authController = require("../../controllers/auth.controller");
const {expect, assert} = require("chai");
const should = require("chai").should();
const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("AuthController", () => {
    beforeEach(function settingUpRoles() {
        console.log("running before each");
        authController.setRoles(['user']);
    });

    describe("isAuthorized", () => {
        let user = {};

        beforeEach(() => {
            user = {
                roles: ['user'],
                isAuthorized: function(neededRole) {
                    return this.roles.indexOf(neededRole) >= 0;
                }
            };
            sinon.spy(user, 'isAuthorized');
            authController.setUser(user);
        });

        it("should return false if not authorized", () => {
            const isAuth = authController.isAuthorized("admin");
            user.isAuthorized.calledOnce.should.be.true;
            expect(isAuth).to.be.false;
        });

        it("should return true if not authorized", () => {
            authController.setRoles(['user', 'admin']);
            const isAuth = authController.isAuthorized("admin");
            assert.equal(true, isAuth);
            isAuth.should.be.true;
        });

    });

    describe("isAuthorizedAsync", () => {
        it("should return false if not authorized", function (done) {
            authController.isAuthorizedAsync('admin',
                function (isAuth) {
                    assert.equal(false, isAuth);
                    done();
                }
            );
        });
    });

    describe("isAuthorizedPromise", () => {
        it("should return false if not authorized", function () {
            return authController.isAuthorizedPromise('admin').should.eventually.be.false;
        });
    });

    describe("getIndex", () => {
        let user = {};
        beforeEach(() => {
            user = {
                roles: ['user'],
                isAuthorized: function(neededRole) {
                    return this.roles.indexOf(neededRole) >= 0;
                }
            };
        });
        it('should render index', () => {
            const isAuth = sinon.stub(user, 'isAuthorized').returns(true);
            const req = {user: user};
            const res = {
                render: sinon.spy()
            };
            authController.getIndex(req, res);
            isAuth.calledOnce.should.be.true;
            res.render.firstCall.args[0].should.equal('index');
        })
    });


});
