import React from "react";
import "../../styles/assetbalance.css";
function BuySellIndicator() {
  return (
    <div>
      <div className="asset-balance-indicator-item asset-balance-indicator-item__sell"></div>
      <div className="asset-balance-indicator-item asset-balance-indicator-item__buy"></div>
    </div>
  );
}

export default BuySellIndicator;
