class User {
  constructor(userInfo) {
    this.id = userInfo.id;
    this.name = userInfo.name;
  }

  getAllUserBookings(todaysDate, bookingData) {
    return bookingData.filter(booking => booking.userID === this.id);
  }

  findUserCurrentBookings(todaysDate, bookingData) {
    return this.getAllUserBookings(todaysDate, bookingData).filter(booking => booking.date >= todaysDate);
  }

  findPastBookings(todaysDate, bookingData) {
    return this.getAllUserBookings(todaysDate, bookingData).filter(booking => booking.date < todaysDate);
  }

  findTotalSpentOnRooms(todaysDate, roomData, bookingData) {
    let userBookings = this.getAllUserBookings(todaysDate, bookingData);
    let totalCost = 0;

    userBookings.forEach(booking => {
      roomData.forEach(room => {
        if(booking.roomNumber === room.number) {
          return totalCost += room.costPerNight
        }
      })
    })
    return Math.round(totalCost);
  }

  // bookARoom() {
  //
  // }
}

export default User;
