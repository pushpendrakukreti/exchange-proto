import { useState, useEffect } from "react";
import axios from "axios";
import { rootUrl } from "../utilities/constants";
import ResizePanel from "react-resize-panel";
import "../../styles/deskttoptradeview.css";
import Draggable from "react-draggable";
import MarketList from "../marketlist/marketlist";
import Desktopgraph from "../graph/desktopgraph";
import { useSelector, useDispatch } from "react-redux";
import {
  updateHistory,
  updateOpenPosition,
  setTradeCloseId,
} from "../../store/slice";
import { historyEndpoint, openpositionEndpoint } from "../utilities/endpoints";
import CloseTradeModal from "./closetrademodal";
function DesktopTradeView() {
  const dispatch = useDispatch();
  const historyData = useSelector((state) => state.history.history);
  const openPositionData = useSelector(
    (state) => state.openposition.openposition
  );
  const tradecloseId = useSelector((state) => state.tradeclose.transaction_id);
  const authTokens = useSelector((state) => state.access.access).token;
  const [LeftToggle, setLeftToggle] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const indexLeftToggle = () => {
    setLeftToggle(!LeftToggle);
  };

  const [deltaPosition, setDeltaPosition] = useState(247);
  const [activeTab, setActiveTab] = useState(true);

  const setOpenPositionActive = () => {
    if (activeTab) {
      setActiveTab(false);
    }
  };
  const setHistoryActive = () => {
    if (!activeTab) {
      setActiveTab(true);
    }
  };

  const handleDrag = (e, ui) => {
    setDeltaPosition(deltaPosition + ui.deltaY);
  };
  const closeTrade = (id) => {
    const transaction_id = id;
    console.log(transaction_id);
    dispatch(setTradeCloseId(transaction_id));
    setShowTradeModal(true);
  };
  const history = async () => {
    try {
      const response = await axios.get(`${rootUrl}${historyEndpoint}`, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
          "Content-Type": "application/json",
        },
      });
      const status = await response.status;

      if (status === 200) {
        console.log(response.data.data);
        dispatch(updateHistory(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openposition = async () => {
    try {
      const response = await axios.get(`${rootUrl}${openpositionEndpoint}`, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
          "Content-Type": "application/json",
        },
      });
      const status = await response.status;

      if (status === 200) {
        console.log(response.data.data);
        dispatch(updateOpenPosition(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    history();
    openposition();
  }, [authTokens]);

  return (
    <>
      <div className="index">
        <div className={`index-left ${LeftToggle ? "index-left__mini" : ""}`}>
          <div className="index-left-component">
            <MarketList LeftToggleProps={LeftToggle} />
          </div>
          <button
            className="index-left-toggle"
            onClick={() => indexLeftToggle()}
          ></button>
        </div>

        <div className="index-right">
          <div className="index-right-top" style={{ height: 450 }}>
            <div className={`charts ${"charts__0"} ${"charts__grid"}`}>
              <Desktopgraph />

              <div className="switch-grid">
                <div className="switch-grid__btn">
                  <i className="fa fa-th-large" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="index-right-bottom" style={{ height: deltaPosition }}>
            <div className="widgets-footer">
              <div className="tabs">
                <div className="dragzone">
                  <div className="tabs-control">
                    <button
                      className={`tabs-control-item ${
                        activeTab ? "" : "tabs-control-item__active"
                      }`}
                      onClick={() => setOpenPositionActive()}
                    >
                      <span>Open Positions</span>
                      <div className="table-count">(0)</div>
                    </button>

                    <button
                      className={`tabs-control-item ${
                        activeTab ? "tabs-control-item__active" : ""
                      }`}
                      onClick={() => setHistoryActive()}
                    >
                      <span>History</span>
                      <div className="table-count">(0)</div>
                    </button>
                  </div>

                  {activeTab ? (
                    <>
                      <div className="desk-openposition-header">
                        {/*History header*/}
                        <span>Symbol</span>
                        <span>Ticket</span>
                        <span>Close Time</span>
                        <span>Type</span>
                        <span>Volume</span>

                        <span>S/L</span>

                        <span>Profits</span>
                      </div>
                      <div className="tabs-content">
                        {/*History data*/}

                        {historyData.map((index,key) => (
                          <div
                            className="mobile-table-row asset"
                            key={`mobile-`+key}
                          >
                            <div className="mobile-table-col">
                              <span className="mobile-asset-value">
                                {index.symbol}
                              </span>
                            </div>
                            <div className="mobile-table-col">
                              <span className="mobile-asset-value">
                                {index.id}
                              </span>
                            </div>

                            <div className="mobile-table-col withstyle1-mobile">
                              <span className="mobile-asset-value">
                                {index.close_time || "23:21:23"}
                              </span>
                            </div>

                            <div className="mobile-table-col withstyle1-mobile">
                              <span className="mobile-asset-value">
                                {index.trade_type}
                              </span>
                            </div>
                            <div className="mobile-table-col withstyle1-mobile">
                              <span className="mobile-asset-value">
                                {index.asset_volume}
                              </span>
                            </div>
                            <div className="mobile-table-col withstyle1-mobile">
                              <span className="mobile-asset-value">
                                {index.stop_loss_value}{" "}
                              </span>
                            </div>
                            <div className="mobile-table-col withstyle1-mobile">
                              <span className="mobile-asset-value">
                                {" "}
                                {index.profit}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="desk-history-header">
                        {/*Open Positions header*/}
                        <span>Order id</span>

                        <span>Type</span>
                        <span>Open time</span>

                        <span>Volume</span>
                        <span>Symbol</span>
                        <span>SL</span>
                        <span>Profits</span>
                        <span>Close Trade</span>
                      </div>
                      <div className="tabs-content">
                        {/*Open Positions data*/}

                        {openPositionData.map((index, key) => (
                          <div
                            className="mobile-table-row asset"
                            key={index.id}
                          >
                            <span className="mobile-asset-value">
                              {index.id | key}
                            </span>

                            <span className="mobile-asset-value">
                              <span></span>
                              {index.trade_type}
                            </span>

                            <span className="mobile-asset-value">
                              {index.open_time || "23:24:21"}
                            </span>

                            <span className="mobile-asset-value">
                              {index.cost}
                            </span>

                            <span className="mobile-asset-value">
                              <span></span>
                              <span></span>
                              {index.symbol}
                            </span>

                            <span className="mobile-asset-value">
                              {index.stop_loss_value}{" "}
                            </span>

                            <span className="mobile-asset-value">
                              {index.profit}
                            </span>

                            <span className="mobile-asset-value">
                              <button
                                className="asset-close"
                                onClick={() => {
                                  closeTrade(index.id);
                                }}
                              >
                                close
                              </button>
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CloseTradeModal
        show={showTradeModal}
        onHide={() => setShowTradeModal(false)}
        history={history}
        openposition={openposition}
      />
    </>
  );
}
export { DesktopTradeView };
