import $ from 'jquery';
import './css/base.scss';
import domUpdates from './domUpdates';
import LoginHandler from './LoginHandler'
import './images/login-pic.jpg';
import './images/staircase.jpg';
import './images/search-icon.png';
import './images/hotel-logo.png';
import './images/calendar.png';

const mockUserData = require('../mockData/mockUserData');
const mockRoomData = require('../mockData/mockRoomData');
const mockBookingData = require('../mockData/mockBookingData');

console.log('mockUserData', mockUserData, 'mockRoomData', mockRoomData, 'mockBookingData', mockBookingData);

$(".submit-btn").click(() => {
  getUserInfo(
    $(".username").val(),
    $(".pass-key").val(),
    mockUserData
  )
});

function getUserInfo(username, password) {
  let loginInfo = new LoginHandler();
  console.log('loginInfo', loginInfo);
  if(loginInfo.checkCredientials(password)) {
    // rooms = new Rooms();
    // bookings = new bookings();
    loginInfo.getUserData(username, mockUserData);
    console.log('loginInfo2', loginInfo);
    domUpdates.loadSite(loginInfo, mockBookingData, mockRoomData, mockUserData)
  }
}

// const bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
//   .then(response => response.json())
//   .then(data => data.bookingData)
//   .catch(error => console.log(`There was an error obtaining bookingData ${error}`))
//
// const userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
//   .then(response => response.json())
//   .then(data => data.userData)
//   .catch(error => console.log(`There was an error obtaining userData ${error}`))
//
// const roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
//   .then(response => response.json())
//   .then(data => data.roomData)
//   .catch(error => console.log(`There was an error obtaining roomData ${error}`))
//
// Promise.all([bookingData, userData, roomData])
//   .then(data => {
  //     const bookingInfo = data[0];
  //     const usersInfo = data[1];
  //     const roomsInfo = data[2];
  //     // domUpdates.loadPage(users, sleep, activity, hydration);
  //   })
  //   .catch(error => console.log(`There was an error obtaining all data ${error}`))
  //
  //   console.log('bookingData', bookingData, 'userData', userData, 'roomData', roomData);
