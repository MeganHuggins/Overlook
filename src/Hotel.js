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

  findTodaysBookings(todaysDate) {
    let bookedRooms = [];
      this.bookings.forEach(booking => {
        if(booking.date === todaysDate) {
          bookedRooms.push(booking)
        }
      });
    return bookedRooms;
  }

  findAviableRooms(todaysDate) {
    let bookedRooms = this.findTodaysBookings(todaysDate);
    let availableRooms = [];

    this.rooms.forEach((room) => {
      bookedRooms.forEach((booked) => {
        if (room.number !== booked.roomNumber) {
          availableRooms.push(room);
        }
      });
    });
    return Array.from(new Set(availableRooms));
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
    let availableRooms = this.findAviableRooms(todaysDate);

    return Math.round(bookedRooms.length / availableRooms.length);
  }

}

export default Hotel;
