import React, { useState, useEffect } from "react";
function Search() {
  const [photo, setPhoto] = useState("");
  const [result, setResult] = useState([]);

  const changePhoto = async () => {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${photo}&client_id=pUMdKf_Knqnrm9YOuFpuKbiV5q6WgsAU3vbg5PEkTTA&per_page=20`
    );
    const data1 = await res.json();
    console.log("data 1", data1);
    setResult(data1.results);
  };

  useEffect(() => {
    changePhoto();
  }, [photo]);
  return (
    <>
      <div>
        <input
          type="text"
          id="mySearch"
          placeholder="Search.."
          name="search"
          onChange={(e) => {
            setPhoto(e.target.value);
          }}
        />
      </div>

      <div className="">
        <div className="">
          {result.map((value, imgindex) => {
            return (
              <div key={imgindex} className="wrapper">
                <img src={value.urls.small} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Search;
