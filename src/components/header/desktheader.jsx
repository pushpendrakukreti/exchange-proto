import "../../styles/desktheader.css";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import {
  changeType
} from "../../store/slice";
function DesktHeader(props) {
  const dispatch = useDispatch();
  const chartTradingType = useSelector((state) => state.chart.chartType.value)

  const onGroupSelectChange = (e) =>{
    dispatch(changeType(e.target.value));
  }

  return (
    <>
      <div className="app-header">
        <div className="header-logo">
            EXCHANGE-PROTO
        </div>
        <div className="header-right-inner">
          <div className="group-stock-chart-type">
            <select
              value={chartTradingType}
              name="trade-group-select"
              id="main-select"
              className="group-select"
              onChange={(e) => onGroupSelectChange(e)}
            >
              <option className="trade-list-option" value="-1">
              Select Chart Type
              </option>
              <option className="trade-list-option" value="BARS">
              BARS
              </option>
              <option className="trade-list-option" value="CANDLES">
              CANDLES
              </option>
              <option className="trade-list-option" value="HOLLOW_CANDLES">
              HOLLOW CANDLES
              </option>
              <option className="trade-list-option" value="HEIKIN_ASHI">
              HEIKIN ASHI
              </option>
              <option className="trade-list-option" value="LINE">
              LINE
              </option>
              <option className="trade-list-option" value="AREA">
              AREA
              </option>
              <option className="trade-list-option" value="RENKO">
              RENKO
              </option>
              <option className="trade-list-option" value="LINE_BREAK">
              LINE BREAK
              </option>
              <option className="trade-list-option" value="KAGI">
              KAGI
              </option>
              <option className="trade-list-option" value="POINT_AND_FIGURE">
              POINT AND FIGURE
              </option>
            </select>
          </div>


          <div className="header-balances">
            <div className="header-balances-item">
              <div className="header-balances-item-title">
                <span>Balance</span>
              </div>
              <div className="balance">$32222</div>
            </div>
            <div className="header-balances-item">
              <div className="header-balances-item-title">
                <span>Equity</span>
              </div>
              <div className="balance">$40.00</div>
            </div>
            <div className="header-balances-item">
              <div className="header-balances-item-title">
                <span>Used Margin</span>
              </div>
              <div className="balance">$400</div>
            </div>
            <div className="header-balances-item">
              <div className="header-balances-item-title">
                <span>Free Margin</span>
              </div>
              <div className="balance">$300</div>
            </div>
            <div className="header-balances-item">
              <div className="header-balances-item-title">
                <span>Margin Level</span>
              </div>
              <div className="balance">0%</div>
            </div>
            <div className="header-balances-item">
              <div className="header-balances-item-title">
                <span>Credit</span>
              </div>
              <div className="balance">$0</div>
            </div>
        
          </div>

      
        </div>
      </div>
    </>
  );
}

export default DesktHeader;
