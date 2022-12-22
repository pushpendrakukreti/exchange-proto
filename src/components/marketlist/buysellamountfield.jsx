import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  update,
  edit,
  increaselots,
  decreaselots,
  changeChart,
} from "../../store/slice";

function BuySellAmountField(props) {
  const orderDetails = useSelector((state) => state.order.asset);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="chart-sell-buy-field-input">
        <div className="field field__with-steps field__disabled">
          <button
            className="field-dec"
            onClick={() => dispatch(decreaselots())}
          ></button>
          <div className="field-value">
            <input type="text" disabled="" value={orderDetails.priceOpen} />
          </div>
          <button
            className="field-inc"
            onClick={() => dispatch(increaselots())}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default BuySellAmountField;
