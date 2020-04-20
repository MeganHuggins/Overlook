class Hotel {
  constructor() {
    this.rooms = [];
    this.bookings = []
  }

  sortHotelData(mockBookingData, mockRoomData) {
    this.rooms = mockRoomData;
    this.bookings = mockBookingData
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
    return this.rooms.length - bookedRooms.length

    //
    // for (let i = 0; i < this.rooms.length; i++) {
    //   for (let j = 0; j < bookedRooms.length; i++ ) {
    //     console.log('room', i, 'booked', j);
    //     if(!availableRooms.includes(i) && j.roomNumber !== i.number) {
    //       availableRooms.push(i);
    //     }
    //   }
    // }
    // bookedRooms.filter(bookedRoom => {
    //   this.rooms.forEach(room => {
    //     if(room.number !== bookedRoom.roomNumber) {
    //       if(!availableRooms.includes(room)){
    //         availableRooms.push(room)
    //       }
    //     }
    //   })
    // })

    // this.rooms.forEach(room => {
    //   bookedRooms.forEach(bookedRoom => {
    //     if(!availableRooms.includes(room) && bookedRoom.roomNumber !== room.number) {
    //       availableRooms.push(room)
    //     }
    //   })
    // });
    // return availableRooms;
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

    return availableRooms / bookedRooms.length;
  }

}

export default Hotel;
