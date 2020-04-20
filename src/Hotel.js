class Hotel {
  constructor() {
    this.rooms = [];
    this.bookings = []
  }

  sortHotelData(mockBookingData, mockRoomData) {
    this.rooms = mockRoomData;
    this.bookings = mockBookingData
    console.log('this.rooms', this.rooms, 'this.bookings', this.bookings);
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
    let availableRooms = [];
    let bookedRooms = this.findTodaysBookings(todaysDate);

    // bookedRooms.filter(bookedRoom => {
    //   this.rooms.forEach(room => {
    //     if(room.number !== bookedRoom.roomNumber) {
    //       if(!availableRooms.includes(room)){
    //         availableRooms.push(room)
    //       }
    //     }
    //   })
    // })

    this.rooms.forEach(room => {
      bookedRooms.forEach(bookedRoom => {
        if(!availableRooms.includes(room) && bookedRoom.roomNumber !== room.number) {
          availableRooms.push(room)
        }
      })
    });
    console.log('availableRooms', availableRooms);
    return availableRooms;
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
    console.log('booked', bookedRooms);
    let availableRooms = this.findAviableRooms(todaysDate);
    console.log('available', availableRooms);

    return availableRooms.length / bookedRooms.length
  }

}

export default Hotel;
