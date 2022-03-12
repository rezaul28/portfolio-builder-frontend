import React, {useEffect, useRef, useState} from "react";
import {Editor} from "@tinymce/tinymce-react";
const axios = require("axios");

function createMarkup(description) {
  return {__html: description};
}

export default function ViewCV() {
  const [cv, setCV] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await axios.get(
          "https://portfolio-builder-backend.herokuapp.com/user/profile",
          {
            headers: {
              "portfolio-builder": localStorage.getItem("portfolio-builder"),
            },
          }
        );
        setCV(()=>data.data.data.portfolio)
      } catch {}
    };
    fetch();
  });
  return (
    // <dev style={{"padding": "4rm 4rm 4rm 4rm", margin: "0rem auto"}}   >
      <p style={{"padding-left": "4rm", margin: "4rem"}}>
        <span
          style={{"padding- left": "4rm", margin: "0rem auto"}}
          dangerouslySetInnerHTML={createMarkup(cv)}
        ></span>
      </p>
    // </dev>
  );
}
