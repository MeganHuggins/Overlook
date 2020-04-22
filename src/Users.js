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

  bookARoom(chosenDate) {
   let bookingId = parseInt(event.target.parentNode.dataset.roomNumber)
    console.log('user', this.id, 'id', bookingId, 'bookingDate', typeof chosenDate);

    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "userID": this.id,
        "date": chosenDate,
        "roomNumber": bookingId,
      }),
    })
    .then((response) => response.json())
    .then((data) => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));

    alert('Room has been Booked!')

  }

}

export default User;
