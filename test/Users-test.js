import chai from 'chai';
const expect = chai.expect;
import User from '../src/Users.js';
const mockBookingData = require('../mockData/mockBookingData.js');
const mockRoomData = require('../mockData/mockRoomData.js')
const mockUserData = require('../mockData/mockUserData.js');


describe('User', () => {
  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of User', () => {
    const user1 = new User({id: 47, name: "Rachael Schinner"});

    expect(user1).to.be.an.instanceof(User);
  });

  it('Should have an id', () => {
    let user1 = new User({id: 47, name: "Rachael Schinner"});
    let user2 = new User({id: 33, name: "Rae Wisozk"});
    let user3 = new User({id: 31, name: "Deja Bradtke"});

    expect(user1.id).to.equal(47);
    expect(user2.id).to.equal(33);
    expect(user3.id).to.equal(31);
  });

  it('Should have a name', () => {
    let user1 = new User({id: 47, name: "Rachael Schinner"});
    let user2 = new User({id: 33, name: "Rae Wisozk"});
    let user3 = new User({id: 31, name: "Deja Bradtke"});

    expect(user1.name).to.equal("Rachael Schinner");
    expect(user2.name).to.equal("Rae Wisozk");
    expect(user3.name).to.equal("Deja Bradtke");
  });

  it('Should be able to get all the bookings for a user', () => {
    let user1 = new User({id: 47, name: "Rachael Schinner"});

    expect(user1.getAllUserBookings("2020/04/21", mockBookingData)).to.deep.equal([
  {
    id: '5fwrgu4i7k55hl6tz',
    userID: 47,
    date: '2020/02/19',
    roomNumber: 13,
    roomServiceCharges: []
  },
  {
    id: '5fwrgu4i7k55hl6wi',
    userID: 47,
    date: '2020/02/20',
    roomNumber: 15,
    roomServiceCharges: []
  },
  {
    id: '5fwrgu4i7k55hl6y0',
    userID: 47,
    date: '2020/01/30',
    roomNumber: 2,
    roomServiceCharges: []
  },
  {
    id: '5fwrgu4i7k55hl70b',
    userID: 47,
    date: '2020/01/11',
    roomNumber: 11,
    roomServiceCharges: []
  },
  {
    id: '5fwrgu4i7k55hl72o',
    userID: 47,
    date: '2020/02/03',
    roomNumber: 19,
    roomServiceCharges: []
  },
  {
    id: '5fwrgu4i7k55hl72r',
    userID: 47,
    date: '2020/01/30',
    roomNumber: 22,
    roomServiceCharges: []
  },
  {
    id: '5fwrgu4i7k55hl741',
    userID: 47,
    date: '2020/01/31',
    roomNumber: 14,
    roomServiceCharges: []
  },
  {
    id: '5fwrgu4i7k55hl751',
    userID: 47,
    date: '2020/01/30',
    roomNumber: 18,
    roomServiceCharges: []
  },
  {
    id: '5fwrgu4i7k55hl7bc',
    userID: 47,
    date: '2020/01/29',
    roomNumber: 17,
    roomServiceCharges: []
  },
  {
    id: '5fwrgu4i7k55hl7d3',
    userID: 47,
    date: '2020/02/15',
    roomNumber: 12,
    roomServiceCharges: []
  },
  {
    id: '5fwrgu4i7k55hl7hc',
    userID: 47,
    date: '2020/01/24',
    roomNumber: 13,
    roomServiceCharges: []
  },
  {
    id: '5fwrgu4i7k55hl7hy',
    userID: 47,
    date: '2020/02/17',
    roomNumber: 23,
    roomServiceCharges: []
  },
  {
    id: '5fwrgu4i7k55hl7vb',
    userID: 47,
    date: '2020/02/02',
    roomNumber: 13,
    roomServiceCharges: []
  },
  {
    id: '5fwrgu4i7k55hl81j',
    userID: 47,
    date: '2020/01/16',
    roomNumber: 12,
    roomServiceCharges: []
  },
  {
    id: '5fwrgu4i7k55hl8df',
    userID: 47,
    date: '2020/02/06',
    roomNumber: 22,
    roomServiceCharges: []
  }
]);
  });

  it('Should be able to find a users current/ future bookings', () => {
    let user3 = new User({id: 31, name: "Deja Bradtke"});

    expect(user3.findUserCurrentBookings("2020/04/21", mockBookingData)).to.deep.equal([]);
  });

  it('Should be able to find a users past bookings', () => {
    let user2 = new User({id: 33, name: "Rae Wisozk"});

    expect(user2.findPastBookings("2020/04/21", mockBookingData)).to.deep.equal([
    {
      id: '5fwrgu4i7k55hl6tt',
      userID: 33,
      date: '2020/02/03',
      roomNumber: 5,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl6v9',
      userID: 33,
      date: '2020/02/13',
      roomNumber: 1,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl6y1',
      userID: 33,
      date: '2020/02/23',
      roomNumber: 24,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl71g',
      userID: 33,
      date: '2020/02/08',
      roomNumber: 17,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl747',
      userID: 33,
      date: '2020/01/31',
      roomNumber: 13,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl765',
      userID: 33,
      date: '2020/02/23',
      roomNumber: 10,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl76q',
      userID: 33,
      date: '2020/01/19',
      roomNumber: 17,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl79m',
      userID: 33,
      date: '2020/02/11',
      roomNumber: 24,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl7ap',
      userID: 33,
      date: '2020/02/04',
      roomNumber: 1,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl7c6',
      userID: 33,
      date: '2020/02/27',
      roomNumber: 8,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl7co',
      userID: 33,
      date: '2020/02/12',
      roomNumber: 19,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl7ef',
      userID: 33,
      date: '2020/02/17',
      roomNumber: 20,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl7f0',
      userID: 33,
      date: '2020/02/09',
      roomNumber: 1,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl7fw',
      userID: 33,
      date: '2020/01/27',
      roomNumber: 2,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl7gl',
      userID: 33,
      date: '2020/01/28',
      roomNumber: 10,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl7gy',
      userID: 33,
      date: '2020/02/08',
      roomNumber: 23,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl7hr',
      userID: 33,
      date: '2020/02/20',
      roomNumber: 22,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl7lm',
      userID: 33,
      date: '2020/01/21',
      roomNumber: 16,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl7p8',
      userID: 33,
      date: '2020/02/08',
      roomNumber: 18,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl7qm',
      userID: 33,
      date: '2020/02/17',
      roomNumber: 3,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl82h',
      userID: 33,
      date: '2020/02/25',
      roomNumber: 6,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl832',
      userID: 33,
      date: '2020/01/27',
      roomNumber: 23,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl87c',
      userID: 33,
      date: '2020/01/30',
      roomNumber: 10,
      roomServiceCharges: []
    },
    {
      id: '5fwrgu4i7k55hl890',
      userID: 33,
      date: '2020/01/25',
      roomNumber: 8,
      roomServiceCharges: []
    }
    ]);
  });

  it('Should be able to find the total a user has spent on rooms', () => {
    let user3 = new User({id: 31, name: "Deja Bradtke"});

    expect(user3.findTotalSpentOnRooms("2020/04/21", mockRoomData, mockBookingData)).to.equal(8813);
  });

  it.skip('Should be able to book a new room', () => {
    let user1 = new User({id: 47, name: "Rachael Schinner"});

    user1.bookARoom("2020/05/21");

    expect().to.equal([]);
  });

});
