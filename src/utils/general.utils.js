//general.utils.js
const floatParser = (str) => parseFloat(str.replace(/,/g, "")).toFixed(2);

const flattenArray = (instruments) => {
  let flattenInstruments = {};

  instruments.forEach((instrument) => {
    flattenInstruments[instrument.symbol] = instrument;
  });

  return flattenInstruments;
};

function debounce(func, time) {
  let timer;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => func(...arguments), time);
  };
}

const jsonResponse = (url) => fetch(url).then((res) => res.json());

const errorResponse = (err) => ({ type: "error", message: err.message });

const evaluatePendingTransactions = async (state) => {
  console.log("Evaluating...");
  return state;
};

//time lies between 00:00:00 to 06:30:00 or 17:30:00 to 00:00:00
const showMaintainanceAlert = (start, end) => {
  const t = new Date();
  const startTime = (start ? start : "17:30:00").split(":");
  const endTime = (end ? end : "06:30:00").split(":");

  const startDate = new Date(t.getTime());
  startDate.setHours(startTime[0]);
  startDate.setMinutes(startTime[1]);
  startDate.setSeconds(startTime[2]);

  const endDate = new Date(t.getTime());
  endDate.setHours(endTime[0]);
  endDate.setMinutes(endTime[1]);
  endDate.setSeconds(endTime[2]);

  const midNight = new Date(t.getTime());
  midNight.setHours(0, 0, 0, 0);

  const nextMidNight = new Date(t.getTime());
  nextMidNight.setHours(24, 0, 0, 0);

  return (t > startDate && t < nextMidNight) || (t > midNight && t < endDate);
};

const sortAlphabetically = (property, toggle) => (a, b) => {
  const sortType = toggle ? 1 : -1;

  if (a[property] > b[property]) return sortType;
  if (a[property] < b[property]) return sortType * -1;
  return 0;
};

const setTimeoutPromise = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export {
  floatParser,
  flattenArray,
  debounce,
  jsonResponse,
  errorResponse,
  evaluatePendingTransactions,
  showMaintainanceAlert,
  sortAlphabetically,
  setTimeoutPromise,
};
