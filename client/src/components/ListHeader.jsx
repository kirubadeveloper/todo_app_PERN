/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

const ListHeader = ({ listname, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removieCookie] = useCookies(null);

  const signout = () => {
    console.log("signout");
    removieCookie("Email");
    removieCookie("AuthToken");
    window.location.reload();
  };

  return (
    <div className="list-header">
      <h1>{listname}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>
        <button className="signout" onClick={signout}>
          SIGN OUT
        </button>
      </div>
      {showModal && (
        <Modal mode={"create"} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;
