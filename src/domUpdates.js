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
  loadSite: (loginInfo, mockBookingData, mockRoomData, mockUserData) => {
    user = loginInfo.userData;
    console.log('user', user);
    todaysDate = Moment().format('YYYY/MM/DD');
    console.log('today', todaysDate);

    if (loginInfo.id === "manager") {
      domUpdates.loadManagerPortal(todaysDate, mockBookingData, mockRoomData);
    } else {
      domUpdates.loadCustomerPortal();
    }
    domUpdates.hideLoginPage();
  },

  loadManagerPortal: (todaysDate, mockBookingData, mockRoomData) => {
    hotel.sortHotelData(mockBookingData, mockRoomData);
    let aviableRooms = hotel.findAviableRooms(todaysDate);
    let totalRevenue = hotel.totalRevenueForToday(todaysDate);
    let percentageOccupied = hotel.percentageOfRoomsOccupied(todaysDate);

    $('#available').prepend(`There are ${aviableRooms} room${aviableRooms > 1 ? "s" : ""} still available.`);
    $('#occupied').prepend(`${percentageOccupied} percent of the rooms are occupied`)
    $('#revenue').prepend(`$${totalRevenue}`)

  },

  loadCustomerPortal: () => {
    let newUser = new User(user)
    let userBookings = newUser.findUserBookings();
    let totalBookingCosts = newUser.findTotalSpentOnRooms();
  },

  hideLoginPage: () => {
    $("#login-page").hide();
  }
}

export default domUpdates;
