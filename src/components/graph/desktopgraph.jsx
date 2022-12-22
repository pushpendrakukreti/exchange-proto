import React from "react";
import TradingViewWidget, { Themes, BarStyles} from "react-tradingview-widget";
import "../../styles/desktopchart.css";
import { useSelector } from "react-redux";

function Desktopgraph() {
  const orderDetail = useSelector((state) => state.order.asset);
  const chartTradingType = useSelector((state) => state.chart.chartType.value)
  return (
    <>
      <div className="chartcontainer">
        <div className="tradechart">
          <TradingViewWidget
            symbol={!orderDetail.chart_symbol ? "FX:EURUSD" :orderDetail.chart_symbol }
            theme={Themes.DARK}
            bar={BarStyles[chartTradingType]}
            style="1"
            hide_top_toolbar={true}
            interval="1"
            locale="en"
            timezone="NASDAQ:AAPL"  
          />
        </div>
      </div>
    </>
  );
}

export default Desktopgraph;
