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
    console.log('bookedRooms', bookedRooms);
    let availableRooms = [];

    this.rooms.forEach(room => {
      bookedRooms.forEach(booked => {
        console.log(booked);
        if(booked.roomNumber !== room.number) {
          availableRooms.push(room);
        }
      })
    });

    const available = new Set(availableRooms);

    // 16 should come back
    console.log('available', available);
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

    return Math.round(availableRooms / bookedRooms.length);
  }

}

export default Hotel;
