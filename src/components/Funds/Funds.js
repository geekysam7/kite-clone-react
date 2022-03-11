import { faCreditCard } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalType } from "../../redux/uistate/uistate.action";
import { addBalance, withdrawBalance } from "../../redux/user/user.action";
import { constants } from "../../utils/constants";
import { setTimeoutPromise } from "../../utils/functions";
import Modal from "../Modal/Modal";

function Funds() {
  const dispatch = useDispatch();
  const withdrawableBalance = useSelector(
    (state) => state.user.balance.withdrawableBalance
  );
  const modalTypeOpen = useSelector((state) => state.uistate.modalTypeOpen);
  const [selectedWindow, setSelectedWindow] = useState("ADD");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [funds, setFunds] = useState("");

  const handleFundsChange = (e, direct) => {
    let val = direct || e.target.value;
    if ((Number(val) || !val) && val.length <= 6) setFunds(val);
  };

  const close = () => {
    if (isLoading) return;
    dispatch(setModalType(""));
  };

  const handleSubmit = async () => {
    if (!funds) {
      setError("No amount specified!");
      return;
    } else {
      setError("");
    }

    if (selectedWindow === "WITHDRAW" && Number(funds) > withdrawableBalance) {
      dispatch(setModalType(""));
      return;
    }

    try {
      setIsLoading(true);

      await setTimeoutPromise(2000);

      if (selectedWindow === "ADD") {
        dispatch(addBalance(Number(funds)));
      } else {
        dispatch(withdrawBalance(Number(funds)));
      }

      dispatch(setModalType(""));
      setError("");
      setFunds("");
    } finally {
      setIsLoading(false);
    }

    console.log(funds);
  };

  return (
    <>
      <span
        className="cursor"
        onClick={() => dispatch(setModalType(constants.FUNDS))}
      >
        <span className="desktop">Funds</span>
        <span className="mobile">
          <FontAwesomeIcon icon={faCreditCard} />
        </span>
      </span>
      {modalTypeOpen === constants.FUNDS && (
        <Modal
          title="Add Funds"
          close={close}
          show={true}
          closeButton={"Close"}
          submitButton={selectedWindow === "ADD" ? "Add" : "Withdraw"}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        >
          <nav>
            <ul className="funds-lists">
              <li
                onClick={() => !isLoading && setSelectedWindow("ADD")}
                className={
                  selectedWindow === "ADD" ? "funds-lists--active" : ""
                }
              >
                Add Fund
              </li>
              <li
                onClick={() => !isLoading && setSelectedWindow("WITHDRAW")}
                className={
                  selectedWindow === "WITHDRAW" ? "funds-lists--active" : ""
                }
              >
                Withdraw Fund
              </li>
            </ul>
          </nav>

          <div className="funds-wrapper">
            <span className="funds-symbol">₹</span>
            <input
              type="text"
              placeholder="Ex: 1000"
              className="funds-input"
              value={funds}
              onChange={handleFundsChange}
            />
          </div>

          {error && <div className="error-wrapper">{error}</div>}
          {selectedWindow === "WITHDRAW" && (
            <div
              className="meta-info"
              onClick={() => handleFundsChange({}, "" + withdrawableBalance)}
            >
              withdrawable Balance : {withdrawableBalance.toFixed(2)}
            </div>
          )}
        </Modal>
      )}
    </>
  );
}

export default Funds;
