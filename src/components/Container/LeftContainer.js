import {
  faArrowDown,
  faArrowUp,
  faTrash,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BuySellForm } from "..";
import { setMarketData } from "../../redux/market/market.action";
import {
  addItemToWatchlist,
  handleItemInTransaction,
  removeSelectedWatchlistItem,
  toggleWatchlistModalState,
} from "../../redux/watchlist/watchlist.action";
import InstrumentNavigation from "../Instrument/InstrumentNavigation";
import NoData from "../NoData/NoData";

const Instrument = ({ item, handleTransactionClick }) => {
  const { market } = useSelector((state) => state.market);

  let instrument = market[item];

  const dispatch = useDispatch();
  const color = instrument
    ? Number(instrument.per) > 0
      ? "text-green"
      : "text-red"
    : "";

  const handleInstrumentDelete = (instrument) => {
    dispatch(removeSelectedWatchlistItem(instrument.id));
  };

  return (
    <>
      {instrument ? (
        <div className="instruments-item" data-symbol={instrument.symbol}>
          <div className={`instruments-item--caption ${color}`}>
            {instrument.symbol}
          </div>
          <div className="instruments-item--change">{instrument.per}</div>
          <div className="change-percentage">%</div>
          <div className={`instruments-item--arrow ${color}`}>
            {instrument.per[0] === "-" ? (
              <FontAwesomeIcon icon={faArrowDown} />
            ) : (
              <FontAwesomeIcon icon={faArrowUp} />
            )}
          </div>
          <div className={`instruments-item--value ${color}`}>
            {instrument.ltP}
          </div>
          <div
            className="instruments-item--options"
            data-symbol={instrument.symbol}
          >
            <button
              className="marketwatch-button marketwatch-button--buy"
              onClick={() => handleTransactionClick("buy", instrument)}
            >
              B
            </button>
            <button
              className="marketwatch-button marketwatch-button--sell"
              onClick={() => handleTransactionClick("sell", instrument)}
            >
              S
            </button>
            <button
              className="marketwatch-button marketwatch-button--delete"
              onClick={() => handleInstrumentDelete(instrument)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default function LeftContainer() {
  const dispatch = useDispatch();

  const { selected, watchlist } = useSelector((state) => state.watchlist);
  const marketData = useSelector((state) => state.market.data);
  const marketWatchData = watchlist[selected]?.items || [];
  //search stocks.
  //set watchlist data.

  useEffect(() => {
    const interval = setInterval(() => {
      const mockAPI = async () => {
        const response = await fetch("mock/indexStocks.json");
        const res = await response.json();
        //update new price.
        dispatch(setMarketData(res));
      };
      mockAPI();
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  //trigger initial marketdata set as we have mock data.
  useEffect(() => {
    dispatch(setMarketData());
  }, [dispatch]);

  const [marketSearch, setMarketSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const handleInstrumentSearch = async (e) => {
    console.log("++");

    let value = e.target.value;
    setMarketSearch(value);
    if (!value) {
      setFilteredList([]);
      return;
    }

    let fL = marketData.filter(
      (item) => !!item.symbol.toLowerCase().startsWith(value.toLowerCase())
    );

    setFilteredList(fL);
  };

  const [transactionContainer, setTransactionContainer] = useState(null);
  const handleTransactionClick = (type, instrument) =>
    setTransactionContainer({
      type,
      data: { ...instrument },
    });

  const handleWatchlistAddition = (id) => {
    if (selected === 0) {
      dispatch(toggleWatchlistModalState());
      dispatch(handleItemInTransaction({ id }));
    } else {
      dispatch(addItemToWatchlist(id));
    }
  };

  return (
    <div className="container-left">
      <div className="marketwatch-sidebar">
        <div className="marketsearch">
          <input
            type="text"
            id="marketsearch-input"
            className="marketsearch-input"
            value={marketSearch}
            onChange={handleInstrumentSearch}
            placeholder="Search eg: Infy bse, nifty fut weekly, gold mcs"
          />
          <div className="marketsearch-total">7/50</div>
        </div>

        {filteredList.length ? (
          <div className="marketsearch-results">
            <div className="marketsearch-results--instruments">
              {filteredList.map((instrument) => {
                return (
                  <div
                    key={instrument.symbol}
                    className="marketsearch-results--instrument-item"
                  >
                    <div>{instrument.symbol}</div>
                    <button
                      className="marketwatch-button marketwatch-button--add"
                      // data-balloon="Add"
                      onClick={() => handleWatchlistAddition(instrument.id)}
                    >
                      +
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        <div className="instruments">
          {marketWatchData.length ? (
            marketWatchData.map((instrument) => (
              <React.Fragment key={instrument}>
                <Instrument
                  item={instrument}
                  handleTransactionClick={handleTransactionClick}
                />
              </React.Fragment>
            ))
          ) : (
            <NoData
              svg={"/images/marketwatch.svg"}
              title="Nothing here"
              body="Use the search bar to add instruments"
            />
          )}
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
