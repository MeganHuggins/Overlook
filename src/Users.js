class User {
  constructor(userInfo) {
    this.id = userInfo.id;
    this.name = userInfo.name;
  }

  getAllUserBookings(todaysDate, mockBookingData) {
    return mockBookingData.filter(booking => booking.userID === this.id);
  }

  findUserCurrentBookings(todaysDate, mockBookingData) {
    return this.getAllUserBookings(todaysDate, mockBookingData).filter(booking => booking.date >= todaysDate);
  }

  findPastBookings(todaysDate, mockBookingData) {
    return this.getAllUserBookings(todaysDate, mockBookingData).filter(booking => booking.date < todaysDate);
  }

  findTotalSpentOnRooms(todaysDate, mockBookingData, mockRoomData) {
    let userBookings = this.getAllUserBookings(todaysDate, mockBookingData);
    let totalCost = 0;

    userBookings.forEach(booking => {
      mockRoomData.forEach(room => {
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
