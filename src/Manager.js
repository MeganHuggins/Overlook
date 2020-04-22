class Manager extends Users {
  constructor() {

  }

  deleteBooking(hotel) {
    let date = $('.selected-date-manager').val().split('-').join('/')
      let bookingId = event.target.parentNode.id
      fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: +bookingId
        })
      })
      .then(response => console.log(response))
      .then(() => {hotelFetch(date)})
      .catch(err => console.log(err));
  };
}

export default Manager;
