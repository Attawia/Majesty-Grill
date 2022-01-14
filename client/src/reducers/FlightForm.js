


export default (flights = [], action) => {
  switch (action.type) {
    case 'CREATE':
      return [...flights, action.payload];
    default:
      return flights;
  }
};