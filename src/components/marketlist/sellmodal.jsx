import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Image } from "react-bootstrap";
import EuroUsd from "../../images/eurousd.png";
import BuySellAmountField from "./buysellamountfield";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "../../styles/modalpopup.css";
import BuyButton from "./buybutton";
import SellButton from "./sellbutton";
import BuySellIndicator from "./buysellindicator";
import ModalCloseBtn from "../icons/modalclosebutton.svg";
import AssetBalaance from "./assetbalance";
import { useSelector, useDispatch } from "react-redux";
import {
  update,
  edit,
  increaselots,
  increasestoplevel,
  decreasestoplevel,
  resetstoplevel,
  decreaselots,
  changeChart,
} from "../../store/slice";
import axios from "axios";
import { rootUrl } from "../utilities/constants";

import { buyEndpoint } from "../utilities/endpoints";
import { sellEndpoint } from "../utilities/endpoints";

function SellModal(props) {
  const [tabBg, setTabBg] = useState(false);
  const toggleTab = () => {
    setTabBg(!tabBg);
  };
  const onHide = props.onHide;

  const balance = useSelector((state) => state.balance.balance);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const orderDetails = useSelector((state) => state.order.asset);
  const authTokens = useSelector((state) => state.access.access).token;
  const dispatch = useDispatch();
  var asset = orderDetails.displayName;
  var symbol = orderDetails.displayName;
  var assetimg = orderDetails.img;
  const [isOrderSent, setOrderSent] = useState(false);
  var price = orderDetails.priceOpen;
  var stop_level_value = orderDetails.stops_level;
  const [step, setStep] = useState(1);
  const [lots_margin_value, setLots_margin_value] = useState(1);
  const [stopLevel, setStopLevel] = useState(1);
  const [profitLossSwitch, setProfitLossSwitch] = useState(false);
  const lotsStep = 0.01;
  const unitStep = 100;
  const amountMultiplier = 100;
  const ratingMultiplier = 0.01;

  const chanegeStep = (newStep) => {
    setTabBg(!tabBg);
    setStep(newStep);
  };

  const changeMultiplier = (newMultiplier) => {
    setProfitLossSwitch(!profitLossSwitch);
    setStopLevel(newMultiplier);
  };
  const inputSelectionChange = (e) => {
    const { name, value } = e.target;
    if (value === "rating") {
      changeMultiplier(ratingMultiplier);
    } else if (value === "amount") {
      changeMultiplier(amountMultiplier);
    }
  };

  const buy = (item) => {
    setIsLoading(true);
    axios
      .post(`${rootUrl}${buyEndpoint}`, item, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          setOrderSent(true);
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  const sell = (item) => {
    setIsLoading(true);
    axios
      .post(`${rootUrl}${sellEndpoint}`, item, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          setOrderSent(true);
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  };

  return (
    <Modal
      {...props}
      size="md"
      className="sellmodal"
      aria-labelledby="sell-modal"
      centered
      animation={true}
      scrollable={true}
    >
      <Modal.Header>
        <Modal.Title id="sell-modal">
          <div className="buy-popup-header">
            <div>
              <i>
                <Image className="curency-icon" src={assetimg} alt=""></Image>
              </i>
            </div>
            <div className="buy-popup-header-detail">
              <span> {asset}</span>
              <span className="utxt">                Current market: {lots_margin_value}{" "}
              </span>
            </div>
          </div>
        </Modal.Title>
        <button className="modal-close" onClick={onHide}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"></path>
          </svg>
        </button>
      </Modal.Header>
      <Modal.Body>
        {isLoading && (
          <Image className="loadingspinner" src="/Iphone-spinner-2.gif" />
        )}
        <form onSubmit={handleSubmit(buy)}>
          <div>
            <AssetBalaance />

            <div className="two-div-row-flex">
              <div className="lots-tab">
                {/* <span> Amount</span> */}
                <div className="lots-tab-btns">
                  <Button
                    className={tabBg ? "unit-btn " : "lots-btn "}
                    disabled={tabBg ? false : true}
                    onClick={() => chanegeStep(lotsStep)}
                  >
                    Lots
                  </Button>
                  <Button
                    className={tabBg ? "lots-btn" : "unit-btn"}
                    disabled={tabBg ? true : false}
                    onClick={() => chanegeStep(unitStep)}
                  >
                    Units{" "}
                  </Button>
                </div>
                <div className="lots-unit-status">
                  <span> Amount</span>
                  <span>($) {lots_margin_value * unitStep * price}</span>
                </div>
              </div>

              <div>
                <div className="chart-sell-buy-field-input">
                  <div className="field field__with-steps field__disabled">
                    <button
                      className="field-dec"
                      onClick={() => dispatch(decreaselots())}
                    ></button>
                    <div className="field-value">
                      <input
                        type="text"
                        disabled=""
                        value={lots_margin_value * step}
                      />
                    </div>
                    <button
                      className="field-inc"
                      onClick={() => dispatch(increaselots())}
                    ></button>
                  </div>
                  <div className="lots-unit-status">
                    {tabBg && <span>Lots: {lots_margin_value}</span>}
                    {!tabBg && (
                      <span>Units: {lots_margin_value * unitStep}</span>
                    )}
                  </div>
                </div>
                <input
                  type="hidden"
                  name="volume"
                  disabled=""
                  value={lots_margin_value * unitStep}
                  className="form-control login-form-field-input"
                  {...register("volume", {
                    required: "unit is required.",
                  })}
                />
                <input
                  type="hidden"
                  name="symbol"
                  disabled=""
                  value={symbol}
                  className="form-control login-form-field-input"
                  {...register("symbol", {
                    required: "Symbol is required.",
                  })}
                />
              </div>
            </div>

            <div className="two-div-row-flex">
              <div>
                <select
                  name="SL"
                  className="form-control sl-dropdown"
                  onChange={(e) => inputSelectionChange(e)}
                >
                  <option value="rating">Rating</option>
                  <option value="amount">Amount</option>
                </select>
                <div className="lots-unit-status">
                  <span> Stop Loss(SL)</span>
                </div>
              </div>

              <div>
                <div className="chart-sell-buy-field-input">
                  <div className="field field__with-steps field__disabled">
                    <button
                      className="field-dec"
                      onClick={() => dispatch(decreasestoplevel())}
                    ></button>

                    <div className="field-value">
                      <input
                        type="text"
                        disabled=""
                        placeholder="Set"
                        value={stop_level_value * stopLevel || ""}
                      />
                    </div>
                    <button
                      className="field-inc"
                      onClick={() => dispatch(increasestoplevel())}
                    ></button>
                  </div>

                  <input
                    type="hidden"
                    disabled=""
                    name="sl"
                    placeholder="Set"
                    value={stop_level_value * amountMultiplier || ""}
                    className="form-control login-form-field-input"
                    {...register("sl", {
                      required: "stop loss is required.",
                    })}
                  />
                  <div className="lots-unit-status">
                    {!profitLossSwitch && (
                      <>
                        <span>Profit/Loss: </span>
                        <span className="profit_and_loss">
                          {stop_level_value * amountMultiplier}${" "}
                        </span>{" "}
                      </>
                    )}
                    {profitLossSwitch && (
                      <>
                        <span>Profit/Loss: </span>
                        <span className="profit_and_loss">
                          {stop_level_value * ratingMultiplier}
                        </span>{" "}
                      </>
                    )}
                  </div>

                  {!orderDetails.stops_level}
                </div>
              </div>
            </div>

            <hr className="white-horizontal-line" />

            <div
              className="d-flex 
                justify-content-between 
                 "
            >
              <Button className="buy-button" onClick={() => handleSubmit(buy)}>
                Buy
              </Button>

              <Button
                type="button"
                className="sell-button"
                onClick={handleSubmit(sell)}
              >
                Sell
              </Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default SellModal;
