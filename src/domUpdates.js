// import moment from 'moment';
import $ from 'jquery';
// import Users from './Users';
// import Manager from './Manager';
// import Customer from './Customer';
// import Rooms from './Rooms';
// import Bookings from './Bookings';
import LoginHandler from './LoginHandler';

let user, rooms, bookings, today;

const domUpdates = {
  loadSite: (loginInfo) => {
    user = loginInfo.userData;
    console.log('user', user);
    // today = roomRepo.getRandomDate();

    // $("<h3/>", {
    //   id: "date",
    //   text: today
    // }).appendTo("header");

    if (loginInfo.id === "manager") {
      loadManagerPage();
    } else {
      loadUserPage();
    }
    hideLoginPage();
  },

  hideLoginPage: () => {
    $("#login-page").slideUp(1000);
  }
}

export default domUpdates;
