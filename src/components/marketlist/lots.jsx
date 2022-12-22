import React from 'react'
import "../../styles/lots.css"
function Lots() {
	return (
		<div className="chart-sell-buy-field">
		<div className="chart-sell-buy-field-label">
		<span>Lots</span>
		</div>
		<div className="chart-sell-buy-field-input">
		<div className="field field__with-steps ">
		<button className="field-dec">
		</button>
		<div className="field-value">
		<input type="text" value="0.19"/>
		</div>
		<button className="field-inc"></button>
		</div>
		</div>
		</div>
	)
}


export function RequiredMargin() {
	return (
		<div className="chart-sell-buy-field chart-sell-buy-field__margin">
		<div className="chart-sell-buy-field-label">
		<span className="required-margin">Required margin</span>
		</div>
		<div className="chart-sell-buy-field-input">
		
		<span title="633.33" className="money">€ 633.33</span>
		
		</div>
		</div>
	)
}



export function PendingOrder() {
	return (
		<div className="chart-sell-buy-field">
		<div className="chart-sell-buy-field-label">
		<div className="checkbox ">
		<label>
		<input type="checkbox"/>
		<div className="checkbox-inner">
		<div className="checkbox-toggle">
		</div>
		<span>
		<span>Pending Order</span></span>
		</div></label>
		</div>
		</div>
		<div className="chart-sell-buy-field-input">
		<div className="field field__with-steps field__disabled">
		<button className="field-dec" disabled=""></button>
		<div className="field-value">
		<input type="text" disabled="" value="1.18054"/>
		</div><button className="field-inc" disabled=""></button>
		</div>
		</div>
		</div>
	)
}
export default Lots;
