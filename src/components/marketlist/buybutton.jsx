import React from 'react'
import {useState} from 'react'
import {Modal,Button} from 'react-bootstrap'

import "../../styles/button.css"
import BuyModal  from "./buymodal"

function BuyButton() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button  className="buy-button" onClick={() => setModalShow(true)}>
        Buy
      </Button>

      <BuyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
export default BuyButton;