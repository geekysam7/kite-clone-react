import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buyInstrument,
  sellInstrument,
} from "../../redux/transaction/transaction.action";
import { floatParser } from "../../utils/functions";

export default function BuySellForm({
  transactionContainer,
  setTransactionContainer,
}) {
  const { data, type } = transactionContainer;

  const portfolioStocks = useSelector((state) => state.user.portfolioStocks);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const TYPE = type === "buy" ? "Buy" : "Sell";

  const [quantity, setQuantity] = useState(1);
  const [triggerPrice, setTriggerPrice] = useState("");

  useEffect(() => {
    setTriggerPrice(floatParser(data.ltP));
  }, [data]);

  console.log("TRIGGEr", data.ltP, triggerPrice);
  const handleSubmit = (e) => {
    e.preventDefault();

    //prevent selling more stocks then present.
    if (type === "sell") {
      if (
        !portfolioStocks[data.id] ||
        quantity > portfolioStocks[data.id].quantity
      )
        return;
    }

    setIsLoading(true);

    if (type === "buy") {
      dispatch(
        buyInstrument({
          instrumentId: data.id,
          symbol: data.symbol,
          quantity: Number(quantity),
          triggerPrice: Number(triggerPrice),
          type,
        })
      );
    }

    if (type === "sell") {
      dispatch(
        sellInstrument({
          instrumentId: data.id,
          symbol: data.symbol,
          quantity,
          triggerPrice: Number(triggerPrice),
          type,
        })
      );
    }
    setTransactionContainer(null);

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
              {TYPE} <span className={`${type}-symbol`}>{data.symbol}</span>
            </div>
            <div className="transaction-market">NSE</div>
            <div className="transaction-quantity">
              {" "}
              x <span className={`${type}-quantity-top`}>1</span>Qty
            </div>
          </div>
          <div className="flex-row">
            <div className="transaction-window--header-radio">
              <span htmlFor="NSE">
                NSE: <span className={`${type}-price-top`}>{data.ltP}</span>
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
              value={data.ltP}
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
            {data.ltP}
          </div>
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
            onClick={() => setTransactionContainer(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
