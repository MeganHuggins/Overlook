import chai from 'chai';
const expect = chai.expect;
import LoginHandler from '../src/LoginHandler.js';
const mockBookingData = require('../mockData/mockBookingData.js');
const mockRoomData = require('../mockData/mockRoomData.js')
const mockUserData = require('../mockData/mockUserData.js');

describe('LoginHandler', () => {
  it('Should be a function', () => {
    expect(LoginHandler).to.be.a('function');
  });

  it('Should be an instance of User', () => {
    const newLogin1 = new LoginHandler('customer5', 'overlook2020');
    const newLogin2 = new LoginHandler('manager', 'overlook2020');

    expect(newLogin1).to.be.an.instanceof(LoginHandler);
    expect(newLogin2).to.be.an.instanceof(LoginHandler);
  });

  it('Should start out with a user dataset of null', () => {
    const newLogin1 = new LoginHandler('customer5', 'overlook2020');

    expect(newLogin1.userData).to.equal(null);
  });

  it('Should start out with a user ID of null', () => {
    const newLogin1 = new LoginHandler('customer5', 'overlook2020');

    expect(newLogin1.id).to.equal(null);
  });

  it('Should be able to check Credientials', () => {
    const newLogin2 = new LoginHandler('manager', 'overlook2020');
    const newLogin3 = new LoginHandler('customer5', 'password');

    expect(newLogin2.checkCredientials('overlook2020')).to.deep.equal(true);
    expect(newLogin3.checkCredientials('password')).to.deep.equal(false);
  });

  it('Should be able to asign data for ID and dataset', () => {
    const newLogin1 = new LoginHandler('customer5', 'overlook2020');
    const newLogin2 = new LoginHandler('manager', 'overlook2020');

    newLogin1.getUserData('manager', mockUserData);
    newLogin2.getUserData('customer5', mockUserData);

    expect(newLogin1.userData).to.equal(mockUserData);
    expect(newLogin1.id).to.equal("manager");

    expect(newLogin2.userData).to.deep.equal({ id: 5, name: 'Rhiannon Little' });
    expect(newLogin2.id).to.equal(5);
  });

});
