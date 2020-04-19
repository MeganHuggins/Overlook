class LoginHandler {
  constructor(username, password) {
      this.id = null;
      this.valid = false;
      this.userData = null;
      this.checkCredentials(username, password);
    }
