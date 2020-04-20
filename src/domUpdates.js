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
      domUpdates.loadCustomerPortal(todaysDate, mockBookingData, mockRoomData);
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

  loadCustomerPortal: (todaysDate, mockBookingData, mockRoomData) => {
    let newUser = new User(user);
    let currentBookings = newUser.findUserCurrentBookings(todaysDate, mockBookingData);
    let pastBookings = newUser.findPastBookings(todaysDate, mockBookingData);
    let totalBookingCosts = newUser.findTotalSpentOnRooms(todaysDate, mockBookingData, mockRoomData);
    console.log('currentBookings', currentBookings);

    $('#upcoming-bookings').html(
    `<h2>Upcoming Bookings</h2>
      <table class="booking-table">
        ${currentBookings.length ? currentBookings.map(booking =>
          `<tr>
            <td>${booking.date}</td>
            <td>Room ${booking.roomNumber}</td>
          </tr>`).join("")
          :
          `<p>You currently have no upcoming bookings. Use the calendar to the right to start planning your next stay. </p>`
        }
      </table>`
    );

    $('#past-bookings').html(
    `<h2>Past Bookings</h2>
      <table class="booking-table">
      ${pastBookings.map(booking =>
      `<tr>
        <td>${booking.date}</td>
        <td>Room ${booking.roomNumber}</td>
        </tr>`).join("")
      }</table>`
    );

    $('#money-spent').prepend(`$${totalBookingCosts}`);
  },

  hideLoginPage: () => {
    $("#login-page").hide();
  }
}

export default domUpdates;
