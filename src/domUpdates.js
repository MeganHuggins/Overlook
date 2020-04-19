import $ from 'jquery';
import moment from 'moment';
import Users from './Users';


let bookings, rooms, user;

function login(username, pass) {
  const login = new LoginManager(username, pass, function() {
    user = login.userData;
    if (login.id === "manager") {
      loadManagerPage();
    } else {
      loadUserPage();
    }
    hideLoginPage();
  });
}


export default domUpdates;
