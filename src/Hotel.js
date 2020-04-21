class Hotel {
  constructor() {
    this.rooms = [];
    this.bookings = []
  }

  sortHotelData(roomData, bookingData) {
    this.rooms = roomData;
    this.bookings = bookingData
    // console.log('this.rooms', this.rooms, 'this.bookings', this.bookings);
  }

  findTodaysBookings(date) {
    let bookedRooms = [];
      this.bookings.forEach(booking => {
        if(booking.date === date) {
          bookedRooms.push(booking)
        }
      });;
    return bookedRooms;
  }

  findAviableRooms(date) {
    let bookedRoomNumbers = this.findTodaysBookings(date).map(booked => booked.roomNumber);

    return this.rooms.filter(room => !bookedRoomNumbers.includes(room.number))
  }

  totalRevenueForToday(todaysDate) {
    let soldRooms = this.findTodaysBookings(todaysDate);
    let soldRoomPrices = soldRooms.map(soldRoom => {
      this.rooms.forEach(room => {
        if(!soldRoom.costPerNight){
          soldRoom.costPerNight = null;
        }
        if(soldRoom.roomNumber === room.number) {
          soldRoom.costPerNight = room.costPerNight
        }
      })
      return soldRoom.costPerNight;
    });

    return soldRoomPrices.reduce((acc, room) => {
      return acc += room
    }, 0);
  }

  percentageOfRoomsOccupied(todaysDate) {
    let bookedRooms = this.findTodaysBookings(todaysDate);

    return Math.floor(bookedRooms.length/ this.rooms.length * 100);
  }

}

export default Hotel;
