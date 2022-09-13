import { useState, useEffect, useRef } from "react";
import "./App.css";
import OpenModal from "./components/OpenModal";

export default function App() {
  const [images, setImages] = useState([]);
  const [TotalImg, setTotalImg] = useState("");
  const [selectallimage, setSelectallimage] = useState([]);
  const [page, setPage] = useState(1);
  const [selected, setSetselected] = useState(false);

  // const [loaded, setLoaded] = useState(false);
  // const imgRef = useRef();

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=nature&client_id=pUMdKf_Knqnrm9YOuFpuKbiV5q6WgsAU3vbg5PEkTTA&per_page=20`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setImages(data.results);
        setTotalImg(data.results);
      });
  }, [page]);

  // console.log("backup images", TotalImg);
  // console.log("IMAGES", images);

  const search = (value) => {
    if (value == "") {
      return setImages(TotalImg);
    }

    const searchedImg = TotalImg.filter((item) => {
      if (item.description !== null && item.alt_description !== null) {
        return item.description.indexOf(value) == -1 ? false : true;
      } else return false;
    });
    setImages(searchedImg);
  };
  function optionselected(valueof) {
    console.log("valueof", valueof);
    if (valueof == "disc") {
      let newopt = images.sort((a, b) => {
        if (
          a.description?.toLowerCase() > b.description?.toLowerCase() ||
          a.alt_description > b.alt_description
        ) {
          return 1;
        }
        if (
          a.description?.toLowerCase() < b.description?.toLowerCase() ||
          a.alt_description < b.alt_description
        ) {
          return -1;
        }
        return 0;
      });
      setImages([...newopt]);
    } else {
      let newdate = TotalImg.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
      });
      setImages([...newdate]);
    }
  }
  function modal(modelval) {
    setImages([...images, modelval]);
  }
  function deselectimg() {
    setSelectallimage([]);
    setSetselected(false);
  }
  const allselectimg = () => {
    const all = images.map((item) => item.id);
    setSelectallimage(all);
    setSetselected(true);
  };
  function setblur(id) {
    let blur = false;
    for (let i of selectallimage) {
      if (i == id) blur = true;
    }
    return blur;
  }
  // console.log(selectallimage);
  function deleteimage() {
    const newItem = [];
    for (let image of images) {
      let find = false;
      for (let select of selectallimage) {
        if (image.id === select) find = true;
      }

      if (!find) newItem.push(image);
    }
    setImages(newItem);
    setSelectallimage([]);
  }
  const getkeyvalue = (imgId) => {
    let newItem = selectallimage.filter((img) => img !== imgId);
    setSelectallimage([...newItem, imgId]);
  };

  console.log("for delete", selectallimage);
  return (
    <>
      <div className="container">
        <div className="search">
          <input
            type="text"
            id="mySearch"
            placeholder="Search.."
            name="search"
            onChange={(e) => {
              search(e.target.value);
            }}
          />
          {images && (
            <p className="countimg">{images.length} Result (s) Found!</p>
          )}
        </div>
        <div className="buttons">
          <div className="btn">
            {!selected ? (
              <button className="btn1" onClick={allselectimg}>
                Select All
              </button>
            ) : (
              <button className="btn1" onClick={deselectimg}>
                DeSelect All
              </button>
            )}
            <OpenModal
              setblur={setblur}
              modal={modal}
              setTotalImg={setTotalImg}
            />
            {/* model={model(modelval)}  */}
            <button className="btn2" onClick={deleteimage}>
              Delete
            </button>
          </div>
          <div className="dropdown">
            <label>
              Select by:
              <select onChange={(e) => optionselected(e.target.value)}>
                <option>please select</option>
                <option value="disc">discription</option>
                <option value="date">Date</option>
              </select>
            </label>
          </div>
        </div>
        {images.map((image) => {
          return (
            <div className="wrapper" key={image.id}>
              <img
                className={setblur(image.id) ? "img select" : "img"}
                src={image.urls.small}
                // ref={imgRef}
                onClick={() => getkeyvalue(image.id)}
              />
              <p className="discription">
                {image.description || image.alt_description}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
