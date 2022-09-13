import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./modal.css";
// const customStyles = {
//   content: {
//     position: "absolute",
//     background: "white",
//     height: "110px",
//     width: "25%",
//     top: "40%",
//     left: "40%",
//     transform: "translate(-50%,-50%)",
//   },
// };

function OpenModal({ modal, setTotalImg }) {
  const [searchtext, setSearchtext] = useState("");
  const [images, setImages] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?client_id=pUMdKf_Knqnrm9YOuFpuKbiV5q6WgsAU3vbg5PEkTTA&query=` +
        searchtext
    )
      .then((resp) => resp.json())
      .then((data) => {
        setImages(data.results);
      });
  }, [searchtext]);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // subtitle.style.color = "#f00";
  // }

  function closeModal() {
    setIsOpen(false);
    setImages([]);
  }
  function handleClichSearch(image) {
    if (image == " ") {
      setImages([]);
      return;
    }
    modal(image);
    setIsOpen(false);
    setTotalImg(image);
  }
  // function handeleSlice(val) {
  //   const valslice = val.slice(0, 5);
  //   return valslice;
  // }
  return (
    <div>
      <button className="btn3" onClick={openModal}>
        Add Images
      </button>
      <Modal
        className="stylemodal"
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <div className="Search">
          <input
            type="text"
            id="mySearch"
            placeholder="Search.."
            name="search"
            onChange={(e) => {
              setSearchtext(e.target.value);
            }}
          />
          {/* <button onClick={closeModal}>Close</button> */}
        </div>

        {images?.map((image, imgindex) => {
          return (
            <div key={imgindex} className="wrapper">
              <img
                className="img"
                src={image.urls.small}
                onClick={() => handleClichSearch(image)}
              />
              <p className="discription">
                description:{" "}
                {() => image?.description || image?.alt_description}
              </p>
            </div>
          );
        })}
      </Modal>
    </div>
  );
}
export default OpenModal;
