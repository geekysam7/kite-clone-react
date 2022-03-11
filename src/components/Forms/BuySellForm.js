import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buyInstrument,
  handleModifiedTransaction,
  sellInstrument,
} from "../../redux/transaction/transaction.action";
import { setTransactionState } from "../../redux/uistate/uistate.action";
import { floatParser } from "../../utils/functions";

export default function BuySellForm() {
  const {
    isModified,
    current: { instrumentId, type, symbol, quantity: currentQuantity },
    previous,
  } = useSelector((state) => state.uistate.transactionState);

  let ltP = useSelector((state) => state.market.market[instrumentId].ltP);
  const portfolioStocks = useSelector((state) => state.user.portfolioStocks);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const TYPE = type === "buy" ? "Buy" : "Sell";

  const [quantity, setQuantity] = useState(1);
  const [triggerPrice, setTriggerPrice] = useState("");

  useEffect(() => {
    setTriggerPrice(floatParser(ltP));
  }, [ltP]);

  useEffect(() => {
    setQuantity(currentQuantity || 1);
  }, [currentQuantity]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //prevent selling more stocks then present.

    if (isModified) {
      console.log(isModified);

      if (type === "sell") {
        if (
          !portfolioStocks[instrumentId] ||
          quantity >
            portfolioStocks[instrumentId].quantity -
              portfolioStocks[instrumentId].holdQuantity +
              previous.quantity
        ) {
          return;
        }
      }

      dispatch(
        handleModifiedTransaction({
          previous,
          current: {
            id: previous.id, //transaction id
            instrumentId: instrumentId,
            symbol,
            quantity: Number(quantity),
            triggerPrice: Number(triggerPrice),
            parsedTriggerPrice: Number(triggerPrice),
            type,
          },
        })
      );

      dispatch(setTransactionState({}));

      return;
    }

    if (type === "sell") {
      if (
        !portfolioStocks[instrumentId] ||
        quantity >
          portfolioStocks[instrumentId].quantity -
            portfolioStocks[instrumentId].holdQuantity
      )
        return;
    }

    setIsLoading(true);

    if (type === "buy") {
      dispatch(
        buyInstrument({
          instrumentId: instrumentId,
          symbol: symbol,
          quantity: Number(quantity),
          triggerPrice: Number(triggerPrice),
          type,
        })
      );
    }

    if (type === "sell") {
      dispatch(
        sellInstrument({
          instrumentId: instrumentId,
          symbol: symbol,
          quantity: Number(quantity),
          triggerPrice: Number(triggerPrice),
          type,
        })
      );
    }

    //default state.
    dispatch(setTransactionState({}));

    setIsLoading(false);
  };

  return (
    <form
      className="transaction-window"
      id={`${type}-form`}
      onSubmit={handleSubmit}
    >
      <div className="transaction-window--header">
        <div className="transaction-window--header-left">
          <div className="flex-row">
            <div className="transaction-caption">
              {TYPE} <span className={`${type}-symbol`}>{symbol}</span>
            </div>
            <div className="transaction-market">NSE</div>
            <div className="transaction-quantity">
              {" "}
              x <span className={`${type}-quantity-top`}>{quantity}</span>Qty
            </div>
          </div>
          <div className="flex-row">
            <div className="transaction-window--header-radio">
              <span htmlFor="NSE">
                NSE: <span className={`${type}-price-top`}>{ltP}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="transaction-window--main">
        <div className="transaction-window--input">
          <div>
            <label htmlFor={`${type}-quantity`} className="label">
              Quantity
            </label>
            <input
              type="number"
              id={`${type}-quantity`}
              required
              min="1"
              value={quantity}
              placeholder="Qty."
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="price-container label">
            <label htmlFor={`${type}-price`} className="label">
              Price
            </label>
            <input
              type="text"
              id={`${type}-price`}
              value={ltP}
              disabled
              placeholder="Price"
            />
          </div>
          <div>
            <label htmlFor={`${type}-trigger-price`} className="label">
              Trigger Price
            </label>
            <input
              type="text"
              id={`${type}-trigger-price`}
              value={triggerPrice}
              required
              placeholder="Trigger Price"
              onChange={(e) => setTriggerPrice(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="transaction-window--buttons">
        <div className="flex-row" style={{ fontSize: "small" }}>
          <div>Margin required:</div>
          <div
            style={{ paddingLeft: "5px" }}
            className={`margin ${type}-margin`}
          >
            {ltP * quantity}
          </div>

          {TYPE === "Sell" && (
            <>
              <div style={{ paddingLeft: "5px" }}>Available Quantity: </div>
              <div
                style={{ paddingLeft: "5px" }}
                className={`margin ${type}-margin`}
              >
                {portfolioStocks[instrumentId]?.quantity
                  ? portfolioStocks[instrumentId].quantity -
                    portfolioStocks[instrumentId].holdQuantity
                  : "0"}
              </div>
            </>
          )}
          <div
            style={{ paddingLeft: "5px", cursor: "pointer" }}
            className="fa-solid fa-arrows-rotate text-green margin-refresh"
          ></div>
        </div>
        <div>
          <button
            className={type === "buy" ? "bg-blue" : "bg-orange"}
            type="submit"
            disabled={isLoading}
            style={{ padding: "10px 15px", width: "100px", height: "40px" }}
          >
            {TYPE}
          </button>
          <button
            className="bg-white"
            type="button"
            style={{
              marginLeft: "10px",
              padding: "10px 15px",
              width: "100px",
              height: "40px",
            }}
            onClick={() => dispatch(setTransactionState({}))}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
