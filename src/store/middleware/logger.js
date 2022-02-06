const logger = (destination) => (store) => (next) => (action) => {
  console.log("destination", destination);
  return next(action);
};

export default logger;
