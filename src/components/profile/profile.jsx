import {useState} from 'react'
import {Modal,Button, Image} from 'react-bootstrap'
import EuroUsd from "../../images/eurousd.png" 
import BuySellAmountField from  "./buysellamountfield"
import { Dropdown, DropdownButton } from "react-bootstrap";
import "../../styles/modalpopup.css"
import BuyButton from "./buybutton"
import SellButton from "./sellbutton"
import BuySellIndicator from "./buysellindicator" 
import ModalCloseBtn from "../icons/modalclosebutton.svg"
import AssetBalaance from "./assetbalance"
import {useSelector, useDispatch} from 'react-redux'
import {update, edit,increaselots,increasestoplevel,  decreasestoplevel,  resetstoplevel, decreaselots, changeChart} from "../../store/slice"

function ProfileModal(props) {
    
    const onHide = props.onHide;
   const profile = useSelector(state=>state.profile.profile);
     
  return (
    <Modal
      {...props}
      size="md"
      className="modal"
      aria-labelledby="buy-modal"
      centered
       animation={true}
        scrollable={true}

    >
      <Modal.Header >
        <Modal.Title id="buy-modal" >
          <div className="buy-popup-header">
          <div className="buy-popup-header-detail">
          <span> {profile.full_name}</span>
          <span> {profile.email}</span>
          <span> {profile.currency}</span>
          <span> {profile.phone}</span>
          <span> {profile.country}</span>
           </div>
          </div>
          

        </Modal.Title>
          <button className="modal-close" onClick={onHide}>  
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"></path></svg></button>
          
      </Modal.Header>
    </Modal>
  );
}

export default ProfileModal;

