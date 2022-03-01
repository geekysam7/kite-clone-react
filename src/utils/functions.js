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

export {
  floatParser,
  flattenArray,
  debounce,
  jsonResponse,
  errorResponse,
  evaluatePendingTransactions,
};
