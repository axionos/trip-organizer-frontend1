export const getTrip = trip => {
  return {
    type: 'GET_TRIP',
    trip
  }
}
export const addTrip = trip => {
  return {
    type: 'ADD_TRIP',
    trip
  }
}
export const getTheTrip = trip => {
  return {
    type: 'GET_THE_TRIP',
    trip
  }
}
export const deleteTheTrip = tripId => {
  return {
    type: 'DELETE_THE_TRIP',
    tripId
  }
}
export const getUser = user => {
  return {
    type: 'GET_USER',
    user
  }
}
export const getDays = days => {
  return {
    type: 'GET_DAYS',
    days
  }
}
export const getItems = items => {
  return {
    type: 'GET_ITEMS',
    items
  }
}
export const addItem = item => {
  return {
    type: 'ADD_ITEM',
    item
  }
}

// export const addStartDate = date => {
//   return {
//     type: 'ADD_START_DATE',
//     payload: date
//   }
// }
//
// export const addEndDate = date => {
//   return {
//     type: 'ADD_END_DATE',
//     payload: date
//   }
// }
