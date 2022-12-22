import React from "react";
import { Modal, Image } from "react-bootstrap";
import EuroUsd from "../../images/eurousd.png";
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

function AssetInfoModal(props) {
  const onHide = props.onHide;
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="buy-modal"
      centered
      animation={true}
      scrollable={true}
    >
      <Modal.Header>
        <Modal.Title id="buy-modal">
          <div className="buy-popup-header">
            <div>
              <i>
                <Image className="curency-icon" src={EuroUsd} alt=""></Image>
              </i>
            </div>
            <div className="buy-popup-header-detail">
              <span> EUROUSD</span>
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
        <div>
          <div className="asset-info">
            <div className="asset-info-col ">
              <div className="asset-info-col-inner">
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Spread</span>:
                  </div>
                  <div className="asset-info-item-value">floating</div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Digits</span>:
                  </div>
                  <div className="asset-info-item-value">5</div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Stops level</span>:
                  </div>
                  <div className="asset-info-item-value">0</div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Contract size</span>:
                  </div>
                  <div className="asset-info-item-value">100000</div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Margin currency</span>:
                  </div>
                  <div className="asset-info-item-value">EUR</div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Profit calculation mode</span>:
                  </div>
                  <div className="asset-info-item-value">
                    <span>Forex</span>
                  </div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Margin calculation mode</span>:
                  </div>
                  <div className="asset-info-item-value">
                    <span>Forex</span>
                  </div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Margin hedge</span>:
                  </div>
                  <div className="asset-info-item-value">0</div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Margin percentage</span>:
                  </div>
                  <div className="asset-info-item-value">110%</div>
                </div>
              </div>
            </div>
            <div className="asset-info-col ">
              <div className="asset-info-col-inner">
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Trade</span>:
                  </div>
                  <div className="asset-info-item-value">
                    <span>Trade full</span>
                  </div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Execution</span>:
                  </div>
                  <div className="asset-info-item-value">
                    <span>Market</span>
                  </div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>GTC mode</span>:
                  </div>
                  <div className="asset-info-item-value">
                    <span>Orders GTC</span>
                  </div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Volume minimum</span>:
                  </div>
                  <div className="asset-info-item-value">0.01</div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Volume maximum</span>:
                  </div>
                  <div className="asset-info-item-value">30</div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Volume step</span>:
                  </div>
                  <div className="asset-info-item-value">0.01</div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Swap type</span>:
                  </div>
                  <div className="asset-info-item-value">
                    <span>By points</span>
                  </div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Swap long</span>:
                  </div>
                  <div className="asset-info-item-value">-21.23</div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>Swap short</span>:
                  </div>
                  <div className="asset-info-item-value">-20.31</div>
                </div>
                <div className="asset-info-item">
                  <div className="asset-info-item-label">
                    <span>3 days swap</span>:
                  </div>
                  <div className="asset-info-item-value">
                    <span>Wednesday</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="asset-info-col asset-info-col__full">
              <div className="asset-info-col-inner">
                <div className="asset-info-item">
                  <div className="asset-info-item-value-table2">
                    <div className="market-hours">
                      <div className="market-hours-row">
                        <div className="market-hours-col">
                          <span>Sessions</span>
                        </div>
                        <div className="market-hours-col">
                          <span>Quotes</span>
                        </div>
                        <div className="market-hours-col">
                          <span>Trade</span>
                        </div>
                      </div>
                      <div className="market-hours-row">
                        <div className="market-hours-col">
                          <span>Sunday</span>
                        </div>
                        <div className="market-hours-col">---</div>
                        <div className="market-hours-col">---</div>
                      </div>
                      <div className="market-hours-row">
                        <div className="market-hours-col">
                          <span>Monday</span>
                        </div>
                        <div className="market-hours-col">
                          00:05 - 23:55
                          <br />
                        </div>
                        <div className="market-hours-col">
                          00:05 - 23:55
                          <br />
                        </div>
                      </div>
                      <div className="market-hours-row">
                        <div className="market-hours-col">
                          <span>Tuesday</span>
                        </div>
                        <div className="market-hours-col">
                          00:05 - 23:55
                          <br />
                        </div>
                        <div className="market-hours-col">
                          00:05 - 23:55
                          <br />
                        </div>
                      </div>
                      <div className="market-hours-row">
                        <div className="market-hours-col">
                          <span>Wednesday</span>
                        </div>
                        <div className="market-hours-col">
                          00:05 - 23:55
                          <br />
                        </div>
                        <div className="market-hours-col">
                          00:05 - 23:55
                          <br />
                        </div>
                      </div>
                      <div className="market-hours-row">
                        <div className="market-hours-col">
                          <span>Thursday</span>
                        </div>
                        <div className="market-hours-col">
                          00:05 - 23:55
                          <br />
                        </div>
                        <div className="market-hours-col">
                          00:05 - 23:55
                          <br />
                        </div>
                      </div>
                      <div className="market-hours-row">
                        <div className="market-hours-col">
                          <span>Friday</span>
                        </div>
                        <div className="market-hours-col">
                          00:05 - 23:59
                          <br />
                        </div>
                        <div className="market-hours-col">
                          00:05 - 23:59
                          <br />
                        </div>
                      </div>
                      <div className="market-hours-row">
                        <div className="market-hours-col">
                          <span>Saturday</span>
                        </div>
                        <div className="market-hours-col">---</div>
                        <div className="market-hours-col">---</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AssetInfoModal;
