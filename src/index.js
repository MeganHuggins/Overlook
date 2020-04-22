import $ from 'jquery';
import './css/base.scss';
import domUpdates from './domUpdates';
import LoginHandler from './LoginHandler'
import './images/login-pic.jpg';
import './images/staircase.jpg';
import './images/search-icon.png';
import './images/hotel-logo.png';
import './images/calendar.png';
import './images/single-room.jpg';
import './images/junior-suite.jpg';
import './images/suite.jpg';
import './images/presidential-suite.jpg';

let userData, roomData, bookingData;

$(document).ready(function() {
  $('#login-page').show();
  $('#manager-portal').hide();
  $('#customer-portal').hide();
})

userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(data => data.json())
  .then(data => data.users)
  .catch(error => console.log(`There was an error obtaining userData ${error}`))

roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(data => data.json())
  .then(data => data.rooms)
  .catch(error => console.log(`There was an error obtaining roomData ${error}`))

bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(data => data.json())
  .then(data => data.bookings)
  .catch(error => console.log(`There was an error obtaining bookingData ${error}`))

Promise.all([userData, roomData, bookingData])
  .then(data => {
    userData = data[0];
    roomData = data[1];
    bookingData = data[2];
  })
  .catch(error => console.log(`There was an error obtaining all data ${error}`));


$(".submit-btn").click(() => {
  getUserInfo(
    $(".username").val(),
    $(".pass-key").val(),
    userData
  )
});

function getUserInfo(username, password) {
  let loginInfo = new LoginHandler();
  if(loginInfo.checkCredientials(password)) {
    loginInfo.getUserData(username, userData);
    domUpdates.loadSite(loginInfo, userData, roomData, bookingData)
  }
};
