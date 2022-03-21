import React from "react";
import { Modal } from ".";

function MarketwatchModal({
  instrument,
  close,
  handleInstrumentBuy,
  handleInstrumentSell,
  handleInstrumentDelete,
}) {
  const handleBuy = () => {
    handleInstrumentBuy();
    close();
  };

  const handleSell = () => {
    handleInstrumentSell();
    close();
  };

  const handleDelete = () => {
    handleInstrumentDelete();
    close();
  };

  return (
    <Modal show={true} close={close} title={instrument.symbol + " actions"}>
      <div className="marketwatch-modal">
        <button
          onClick={handleBuy}
          className="marketwatch-modal--button marketwatch-modal--buy"
        >
          Buy
        </button>
        <button
          onClick={handleSell}
          className="marketwatch-modal--button marketwatch-modal--sell"
        >
          Sell
        </button>
        <button
          onClick={handleDelete}
          className="marketwatch-modal--button marketwatch-modal--delete"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default MarketwatchModal;
