const Moment = require('moment')
import $ from 'jquery';
import User from './Users';
// import Manager from './Manager';
// import Customer from './Customer';
import Room from './Room';
import Hotel from './Hotel';
import LoginHandler from './LoginHandler';

let user, rooms, todaysDate;
let hotel = new Hotel();


const domUpdates = {
  loadSite: (loginInfo, mockBookingData, mockRoomData, mockUserData) => {
    user = loginInfo.userData;
    todaysDate = Moment().format('YYYY/MM/DD');

    if (loginInfo.id === "manager") {
      domUpdates.loadManagerPortal(todaysDate, mockBookingData, mockRoomData, mockUserData);
    } else {
      domUpdates.loadCustomerPortal(todaysDate, mockBookingData, mockRoomData);
    }
    domUpdates.hideLoginPage();
  },

  loadManagerPortal: (todaysDate, mockBookingData, mockRoomData, mockUserData) => {
    $('#customer-portal').hide();
    let customers = mockUserData;
    hotel.sortHotelData(mockBookingData, mockRoomData);
    let aviableRooms = hotel.findAviableRooms(todaysDate);
    let totalRevenue = hotel.totalRevenueForToday(todaysDate);
    let percentageOccupied = hotel.percentageOfRoomsOccupied(todaysDate);

    // $('#guest-section').prepend(
    //   `${customers.map(customer =>
    //     `<div class="room-card">
    //       <h3>${customer.name}</h3>
    //       <div class="room-info">
    //       </div>
    //       <button type="button" name="button">BOOK ROOM</button></button>
    //     </div>`
    //     ).join("")}`
    //   );

    $('#available').prepend(`There are ${aviableRooms.length} room${aviableRooms.length > 1 ? "s" : ""} still available.`);

    $('#occupied').prepend(`${percentageOccupied} percent of the rooms are occupied`);

    $('#revenue').prepend(`$${totalRevenue}`)

  },

  loadCustomerPortal: (todaysDate, mockBookingData, mockRoomData) => {
    rooms = mockRoomData;
    let newUser = new User(user);
    let currentBookings = newUser.findUserCurrentBookings(todaysDate, mockBookingData);
    let pastBookings = newUser.findPastBookings(todaysDate, mockBookingData);
    let totalBookingCosts = newUser.findTotalSpentOnRooms(todaysDate, mockBookingData, mockRoomData);


    $('#user-welcome-header').prepend(`Welcome back ${user.name}! Enjoy your stay`);

    $('.filter-room-buttons').prepend(
      `<img src="../images/calendar.png" alt="calendar">
      <input min="${todaysDate.replace(/\//g, '-')}" required type="date" id="date-picker">`);

    $('#rooms-section').prepend(
      `${rooms.map(room =>
        `<div class="room-card">
          <h3>${room.roomType}</h3>
          <div class="room-info">
            <p>Room Number ${room.number}</p>
            <p>Number of Beds: ${room.numBeds}</p>
            <p>Bed Size: ${room.bedSize}</p>
            <p>Bidet: ${room.hasBidet}</p>
            <p>Cost Per Night: ${room.costPerNight}</p>
          </div>
          <button type="button" name="button">BOOK ROOM</button></button>
        </div>`
        ).join("")}`
      );

    $('#upcoming-bookings').html(
    `<h2>Upcoming Bookings</h2>
      <table class="booking-list">
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
      <table class="booking-list">
      ${pastBookings.map(booking =>
      `<tr>
        <td>${booking.date}</td>
        <td>Room ${booking.roomNumber}</td>
        </tr>`).join("")
      }</table>`
    );

    $('#money-spent').prepend(`You have spent a total of $${totalBookingCosts} on bookings.`);

    $('#date-picker').change(function(){
      const date = $('#date-picker').val().replace(/-/g, '/');
      domUpdates.filterAvailableRoomsByDate(chosenDate);
    });

    $('#manager-portal').hide();
  },


  hideLoginPage: () => {
    $('#login-page').hide();
  },

  filterAvailableRoomsByDate: (chosenDate) => {
    let avaiableRooms = hotel.findAviableRooms(chosenDate);


  }

}

export default domUpdates;
