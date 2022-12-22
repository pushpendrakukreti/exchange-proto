import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Image } from "react-bootstrap";

import "../../styles/modalpopup.css";

import { useSelector, useDispatch } from "react-redux";
import { setTradeCloseId } from "../../store/slice";
import axios from "axios";
import { rootUrl } from "../utilities/constants";

import { buyEndpoint } from "../utilities/endpoints";
import { closeTradeEndPoint } from "../utilities/endpoints";

function CloseTradeModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onHide = props.onHide;
  const history = props.history;
  const openposition = props.openposition;

  const id = useSelector((state) => state.tradeclose);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tradeClosed, setTradeClosed] = useState(false);
  const orderDetails = useSelector((state) => state.order.asset);
  const authTokens = useSelector((state) => state.access.access).token;
  const dispatch = useDispatch();

  const handleSubmitt = (item) => {
    setIsLoading(true);
    axios
      .put(`${rootUrl}${closeTradeEndPoint}`, item, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          setTradeClosed(true);
          history();
          openposition();
          setIsLoading(false);
        } else {
          setIsError(true);
        }
      })
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  };
  const cancelClosing = () => {
    dispatch(setTradeCloseId(""));
    onHide();
  };
  const closeModal = () => {
    onHide();
    setTradeClosed(false);
  };
  return (
    <Modal
      {...props}
      size="md"
      className="modal"
      aria-labelledby="buy-modal"
      centered
      animation={true}
      scrollable={true}
    >
      <Modal.Header>
        <Modal.Title id="tradeclose-modal">
          {tradeClosed ? (
            <button className="modal-close" onClick={() => closeModal()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"></path>
              </svg>
            </button>
          ) : (
            ""
          )}

          <div className="buy-popup-header">
            {tradeClosed ? (
              <div>
                <div>
                  <p>Trade was closed successfully</p>
                </div>
                <div className="text-center">
                  <button
                    className="popup-ok w-40"
                    onClick={() => closeModal()}
                  >
                    Ok
                  </button>
                </div>
              </div>
            ) : (
              <p>Are you sure you want to close this trade?</p>
            )}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading && (
          <Image className="loadingspinner" src="/Iphone-spinner-2.gif" />
        )}
        <form>
          <div className="two-div-row-flex">
            <div>
              <input
                type="hidden"
                name="transaction_id"
                disabled=""
                value={id}
                className="form-control login-form-field-input"
                {...register("transaction_id", {
                  required: "No trade to close.",
                })}
              />
            </div>
          </div>

          <div>
            <hr className="white-horizontal-line" />

            {tradeClosed ? (
              ""
            ) : (
              <div className="d-flex justify-content-between">
                <Button
                  className="buy-button"
                  onClick={() => handleSubmitt(id)}
                >
                  Yes
                </Button>

                <Button
                  type="button"
                  className="sell-button"
                  onClick={() => cancelClosing()}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default CloseTradeModal;
