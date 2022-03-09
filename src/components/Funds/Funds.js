import { faCreditCard } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBalance } from "../../redux/user/user.action";
import { setTimeoutPromise } from "../../utils/functions";
import Modal from "../Modal/Modal";

function Funds() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [funds, setFunds] = useState("");

  const handleFundsChange = (e) => {
    let val = e.target.value;
    if ((Number(val) || !val) && val.length <= 6) setFunds(val);
  };

  const close = () => {
    if (isLoading) return;
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!funds) {
      setError("No amount specified!");
      return;
    } else {
      setError("");
    }

    try {
      setIsLoading(true);
      await setTimeoutPromise(2000);
      dispatch(addBalance(Number(funds)));
      setIsModalOpen(false);
      setError("");
      setFunds("");
    } finally {
      setIsLoading(false);
    }

    console.log(funds);
  };

  return (
    <>
      <span className="cursor" onClick={() => setIsModalOpen(true)}>
        <span className="desktop">Funds</span>
        <span className="mobile">
          <FontAwesomeIcon icon={faCreditCard} />
        </span>
      </span>
      {isModalOpen && (
        <Modal
          title="Add Funds"
          close={close}
          show={isModalOpen}
          closeButton={"Close"}
          submitButton={"Add"}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        >
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
        </Modal>
      )}
    </>
  );
}

export default Funds;
