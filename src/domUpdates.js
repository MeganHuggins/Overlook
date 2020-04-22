const Moment = require('moment')
import $ from 'jquery';
import User from './Users';
// import Manager from './Manager';
// import Customer from './Customer';
import Room from './Room';
import Hotel from './Hotel';
import LoginHandler from './LoginHandler';

let user, todaysDate, chosenDate, newUser;
let hotel = new Hotel();


//User Room Filter By Type Buttons
$('.residential-suite-btn').click(() => {
  domUpdates.filterRoomByType("residential")
});
$('.suite-btn').click(() => {
  domUpdates.filterRoomByType("suite")
});
$('.junior-suite-btn').click(() => {
  domUpdates.filterRoomByType("junior")
});
$('.single-room-btn').click(() => {
  domUpdates.filterRoomByType("single")
});


const domUpdates = {
  loadSite: (loginInfo, userData, roomData, bookingData) => {
    user = loginInfo.userData;
    todaysDate = Moment().format('YYYY/MM/DD');

    if (loginInfo.id === "manager") {
      domUpdates.loadManagerPortal(loginInfo, userData, roomData, bookingData);
    } else {
      domUpdates.loadCustomerPortal(todaysDate, roomData, bookingData);
    }
    domUpdates.hideLoginPage();
  },

  loadManagerPortal: (loginInfo, userData, roomData, bookingData) => {
    $('#customer-portal').hide();
    hotel.sortHotelData(roomData, bookingData);
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

  loadCustomerPortal: (todaysDate, roomData, bookingData) => {
    newUser = new User(user);
    let currentBookings = newUser.findUserCurrentBookings(todaysDate, bookingData);
    let pastBookings = newUser.findPastBookings(todaysDate, bookingData);
    let totalBookingCosts = newUser.findTotalSpentOnRooms(todaysDate, roomData, bookingData);
    hotel.sortHotelData(roomData, bookingData);
    domUpdates.createUserRoomCards(roomData);

    $('#user-welcome-header').prepend(`Welcome back ${user.name}! Enjoy your stay`);

    $('.filter-room-buttons').prepend(
      `<img src="../images/calendar.png" alt="calendar">
      <input min="${todaysDate.replace(/\//g, '-')}" required type="date" id="date-picker">`);

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
      chosenDate = $('#date-picker').val().replace(/-/g, '/');
      console.log('chosenDate', chosenDate);
      domUpdates.createUserRoomCards(roomData);
      $('.book-room-btn').click(() => {
        newUser.bookARoom(chosenDate);
      });
      domUpdates.filterAvailableRoomsByDate(chosenDate);
      // //User Room Filter By Type Buttons
      // $('.residential-suite-btn').click(() => {
      //   domUpdates.filterRoomByType("residential")
      // });
      // $('.suite-btn').click(() => {
      //   domUpdates.filterRoomByType("suite")
      // });
      // $('.junior-suite-btn').click(() => {
      //   domUpdates.filterRoomByType("junior")
      // });
      // $('.single-room-btn').click(() => {
      //   domUpdates.filterRoomByType("single")
      // });
    });

    $('#manager-portal').hide();
  },

  hideLoginPage: () => {
    $('#login-page').hide();
  },

  createUserRoomCards: (roomData) => {
    let rooms = roomData;
    $('#rooms-section').prepend(
      `${rooms.map(room =>
        `<div class="room-card" data-room-type=${room.roomType} data-room-number=${room.number}>
          <h3>${room.roomType}</h3>
          <div class="room-info">
          <p>Room Number ${room.number}</p>
          <p>Number of Beds: ${room.numBeds}</p>
          <p>Bed Size: ${room.bedSize}</p>
          <p>Bidet: ${room.hasBidet}</p>
          <p>Cost Per Night: ${room.costPerNight}</p>
        </div>
        <button class="book-room-btn" type="button" name="button">BOOK ROOM</button></button>
      </div>`
      ).join("")}`
    );
  },

  filterAvailableRoomsByDate: (chosenDate) => {
    let roomCards = Array.from(document.querySelectorAll('.room-card'));
    let availableRoomNumbers = hotel.findAvailableRooms(chosenDate).map(room => room.number);

    const toHide = roomCards.filter(card => {
      const cardNumber = parseInt(card.dataset.roomNumber);
      return !availableRoomNumbers.includes(cardNumber);
    });

    toHide.forEach(room => {
      room.classList.add('hidden')
    });

  },

  filterRoomByType: (roomType) => {
    // grab the whole list of room cards
    // go over them, and if they are already hidden, leave them hidden
    // then hide the cards that don't match the room type
    $(".room-card").hide().filter(`[data-room-type="${roomType}"]`).show();
  },

}

export default domUpdates;
