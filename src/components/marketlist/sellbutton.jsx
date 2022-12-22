import React from 'react'
import {useState} from 'react'
import {Modal,Button} from 'react-bootstrap'
import "../../styles/button.css"
import SellModal  from "./sellmodal"

function SellButton(props) {
	const [sellModalShow, setSellModalShow] = useState(false);

  const buttonText = props.buttonText;

  return ( 
    <>
      <Button  className="sell-button" onClick={() => setSellModalShow(true)}>
        {buttonText}
      </Button>

      <SellModal
        show={sellModalShow}
        onHide={() => setSellModalShow(false)}
      />
    </>
  );
}


export default SellButton
