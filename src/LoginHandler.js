class LoginHandler {
  constructor(username, password) {
    this.userData = null;
    this.id = null;
    }

  checkCredientials(password) {
    return password === 'overlook2020'
  }

  getUserData(username, userData) {
    if (username === "manager") {
      this.id = "manager";
      this.userData = userData;
    } else if (username.substr(0, 8) === "customer") {
      this.id = parseInt(username.match(/(\d+)/g)[0]);
      const currentUserData = userData.find(user => user.id === this.id);
      if (currentUserData) {
        this.userData = currentUserData;
      }
    }
  }
}



export default LoginHandler;
