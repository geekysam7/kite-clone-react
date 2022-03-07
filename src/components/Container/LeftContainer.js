import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BuySellForm } from "..";
import InstrumentNavigation from "../Instrument/InstrumentNavigation";

const Instrument = ({ instrument, handleTransactionClick }) => {
  const color = Number(instrument.per) > 0 ? "text-green" : "text-red";

  return (
    <>
      <div className="instruments-item" data-symbol={instrument.symbol}>
        <div className={`instruments-item--caption ${color}`}>
          {instrument.symbol}
        </div>
        <div className="instruments-item--change">{instrument.per}</div>
        <div className="change-percentage">%</div>
        <div className={`instruments-item--arrow ${color}`}>
          {/* {instrument.per[0] === "-" ? (
            <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
          ) : (
            <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
          )} */}
        </div>
        <div className={`instruments-item--value ${color}`}>
          {instrument.ltP}
        </div>
        <div
          className="instruments-item--options"
          data-symbol={instrument.symbol}
        >
          <button
            className="buy-button"
            onClick={() => handleTransactionClick("buy", instrument)}
          >
            Buy
          </button>
          <button
            className="sell-button"
            onClick={() => handleTransactionClick("sell", instrument)}
          >
            Sell
          </button>
        </div>
      </div>
    </>
  );
};

export default function LeftContainer() {
  const [marketWatchData, setMarketWatchData] = useState([]);

  useEffect(() => {
    const mockAPI = async () => {
      const response = await fetch("mock/indexStocks.json");
      const res = await response.json();
      setMarketWatchData(res.data);
    };

    mockAPI();
  }, []);

  const [transactionContainer, setTransactionContainer] = useState(null);
  const handleTransactionClick = (type, instrument) =>
    setTransactionContainer({
      type,
      data: { ...instrument },
    });

  return (
    <div className="container-left">
      <div className="marketwatch-sidebar">
        <div className="marketsearch">
          <input
            type="text"
            id="marketsearch-input"
            className="marketsearch-input"
            placeholder="Search eg: Infy bse, nifty fut weekly, gold mcs"
          />
          <div className="marketsearch-total">7/50</div>
        </div>
        <div className="marketsearch-results">
          <div className="marketsearch-results--instruments"></div>
        </div>
        <div className="instruments">
          {marketWatchData.map((instrument) => (
            <React.Fragment key={instrument.symbol}>
              <Instrument
                instrument={instrument}
                handleTransactionClick={handleTransactionClick}
              />
            </React.Fragment>
          ))}
        </div>
        <InstrumentNavigation />
      </div>
      {transactionContainer && (
        <BuySellForm
          transactionContainer={transactionContainer}
          setTransactionContainer={setTransactionContainer}
        />
      )}
    </div>
  );
}
