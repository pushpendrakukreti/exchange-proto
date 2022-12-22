import React from "react";
import "../../styles/assetbalance.css";
export default function AssetBalaance() {
  return (
    <div className="asset-balance">
      <div className="asset-balance-labels">
        <div className="asset-balance-label">
          <span>24 % Sellers</span>
        </div>
        <div className="asset-balance-label">
          <span className="asset-balance-buyer">76% Buyers</span>
        </div>
      </div>
      <div className="asset-balance-middle">
        <div className="asset-balance-indicator">
          <div className="asset-balance-indicator-item asset-balance-indicator-item__sell"></div>
          <div className="asset-balance-indicator-item asset-balance-indicator-item__buy"></div>
        </div>
      </div>
    </div>
  );
}
