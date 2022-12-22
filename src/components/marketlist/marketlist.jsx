import "../../styles/marketlist.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  updateAsset,
  edit,
  changeChart,
  changeGroup,
  changeSearch,
} from "../../store/slice";
import { useSelector, useDispatch } from "react-redux";
import BuyModal from "./buymodal";
import axios from "axios";
import { rootUrl } from "../utilities/constants";
import { assetEndpoint } from "../utilities/endpoints";
function MarketList(props) {
  var LeftToggle = props.LeftToggleProps;

  const authTokens = useSelector((state) => state.access.access).token;
  const dispatch = useDispatch();

  const getAssets = () => {
    axios
      .get(`${rootUrl}${assetEndpoint}`, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          dispatch(updateAsset(resp.data.data));
        }
      })
      .catch((error) => {
        console.log("Did not get data, check your network and try again");
      });
  };

  useEffect(() => {
    getAssets();
  }, []);

  const [trade, setTrade] = useState(false);

  const toggleTradeButton = () => {
    setTrade(!trade);
  };
  const marketData = useSelector((state) => state.asset.data);
  const groupData = useSelector((state) => state.group.group);
  const searchData = useSelector((state) => state.search.search);

  const onGroupSelectChange = (e) => {
    const { value } = e.target;
    dispatch(changeGroup(value));
    getAllMarketData();
  };

  const getAllMarketData = () => {
    const defaultSelect = "Most Popular"
    if (!searchData && groupData==defaultSelect) {
      return marketData;
    }

    let filterCatgeory = [...marketData];
    if(groupData!=defaultSelect) {
      filterCatgeory = marketData.filter((val)=>{
        if(val.group == groupData) {
          return val
        }
      })
    }

    let filterResult = filterCatgeory.filter((val) => {
      return (
        val.chart_symbol.toLowerCase().includes(searchData) ||
      val.display_name.toLowerCase().includes(searchData) ||
      val.symbol.toLowerCase().includes(searchData)
      );
    });

    if (filterResult) {
      return filterResult;
    }
    return marketData;
  };

  const onSearchInputChange = (e) => {
    let { value } = e.target;
    dispatch(changeSearch(value));
  };

  const [modalShow, setModalShow] = useState(false);
  const [assetInfoModalShow, setAssetInfoModalShow] = useState(false);
  return (
    <>
      <div className={`market ${LeftToggle ? "market__mini" : ""}`}>
        <div className="stochsearch-header">
          <div className="all-stock-sarch ">
            <input
              type="text"
              name="stochsearch"
              className="stocksearch-input"
              placeholder="Search"
              value={searchData}
              onChange={(e) => onSearchInputChange(e)}
            />
          </div>
          <div className="group-stock-search">
            <select
              value={groupData}
              name="trade-group-select"
              id="main-select"
              className="group-select"
              onChange={(e) => onGroupSelectChange(e)}
              disabled={searchData.length > 0 ? true : false}
            >
              <option className="trade-list-option" value="Most Popular">
                Most Popular
              </option>
              <option className="trade-list-option" value="Forex">
                Forex
              </option>
              <option className="trade-list-option" value="Stocks">
                Stocks
              </option>
              <option className="trade-list-option" value="Commodities">
                Commodities
              </option>
              <option className="trade-list-option" value="Cryptocurrencies">
                Cryptocurrencies
              </option>
            </select>
          </div>
        </div>

        <div className="market-table">
          <table>
            <thead>
              <tr>
                <th>
                  <span>Asset</span>
                </th>
                <th colSpan="1">
                  <span>Price </span>
                </th>
                <th colSpan="3" >
                  <span>Change</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {getAllMarketData(marketData)?.map((index, key) => {
                return (
                  <tr className="asset" key={`market-${key}`}>
                    <td>
                      <div className="asset-info">
                        <img className="asset-icon" src={index.img} />
                        <div className="asset-info-name">{index.symbol}</div>
                      </div>
                    </td>

                    <td>
                      <span className="asset-stat ">${index.price}</span>
                    </td>
                    <td>
                      <span
                        title="0"
                        className="asset-stat asset-mover asset-stat__red"
                      >
                        {index.percentage} %
                      </span>
                    </td>
                    <td>
                      <div className="asset-buttons">
                        {trade ? (
                          <button className="asset-open">
                            <span onClick={() => toggleTradeButton()}>
                              Close
                            </span>
                          </button>
                        ) : (
                          <button
                            className="asset-open"
                            onClick={() => {
                              setModalShow(true);
                              dispatch(edit(index));
                            }}
                          >
                            Trade
                          </button>
                        )}
                        <div>
                          <OverlayTrigger
                            key={"placement"}
                            placement="bottom"
                            overlay={
                              <Tooltip id={`tooltip-`}>Add chart</Tooltip>
                            }
                          >
                            <button
                              type="button"
                              className="asset-button asset-button__first"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Add chart"
                              onClick={() => dispatch(edit(index))}
                            >
                              <svg viewBox="0 0 31.49 31.49">
                                <path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111  C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587  c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"></path>
                              </svg>
                            </button>
                          </OverlayTrigger>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>

             <BuyModal show={modalShow} onHide={() => setModalShow(false)} />
          </table>
        </div>
      </div>
    </>
  );
}

export default MarketList;
