import React, { useState } from "react";
import Modal from "../Modal/Modal";

function Funds() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const close = () => setIsModalOpen(false);

  return (
    <>
      <span onClick={() => setIsModalOpen(true)}>Funds</span>
      {isModalOpen && (
        <Modal
          title="Funds"
          close={close}
          show={isModalOpen}
          closeButton={"Close"}
          submitButton={"Add"}
        />
      )}
    </>
  );
}

export default Funds;
