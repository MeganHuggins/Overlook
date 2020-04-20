const Moment = require('moment')
import $ from 'jquery';
import User from './Users';
// import Manager from './Manager';
// import Customer from './Customer';
// import Room from './Room';
import Hotel from './Hotel';
import LoginHandler from './LoginHandler';

let user, rooms, todaysDate;
let hotel = new Hotel();


const domUpdates = {
  loadSite: (loginInfo, mockBookingData) => {
    user = loginInfo.userData;
    todaysDate = Number(Moment().format('YYYY/MM/DD').split('/').join(''));


    if (loginInfo.id === "manager") {
      domUpdates.loadManagerPortal();
    } else {
      domUpdates.loadCustomerPortal();
    }
    domUpdates.hideLoginPage();
  },

  loadManagerPortal: () => {
    let aviableRooms = hotel.findAviableRooms();
    let totalRevenue = hotel.totalRevenueForToday();
    let percentageOccupied = hotel.percentageOfRoomsOccupied();
  },

  loadCustomerPortal: () => {
    let userBookings = user.findUserBookings();
    let totalBookingCosts = user.findTotalSpentOnRooms();
  },

  hideLoginPage: () => {
    $("#login-page").hide();
  }
}

export default domUpdates;
