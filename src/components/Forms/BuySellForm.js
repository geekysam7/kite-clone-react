import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import { floatParser } from "../../utils/functions";

export default function BuySellForm({
  transactionContainer,
  setTransactionContainer,
}) {
  const { data, type } = transactionContainer;
  const { dispatch } = useContext(UserContext);

  const TYPE = type === "buy" ? "Buy" : "Sell";

  const [quantity, setQuantity] = useState(1);
  const [triggerPrice, setTriggerPrice] = useState(floatParser(data.ltP));
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type,
      payload: {
        type,
        triggerPrice,
        quantity,
        symbol: data.symbol,
        ltP: data.ltP,
      },
    });
    setTransactionContainer(null);
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