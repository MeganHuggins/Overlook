class Room {
  constructor(roomData) {
    this.roomNumber = roomData.number;
    this.roomType = roomData.roomType;
    this.hasBidet = roomData.bidet;
    this.bedSize = roomData.bedSize;
    this.numBeds = roomData.numBeds;
    this.costPerNight = roomData.costPerNigh
  }
  //
  // filterRoomByType() {
  //
  // }
}

export default Room;
