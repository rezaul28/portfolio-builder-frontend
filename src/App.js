import React, {useEffect, useRef, useState} from "react";
import {Editor} from "@tinymce/tinymce-react";
const axios = require("axios");

function createMarkup(description) {
  return {__html: description};
}

export default function App() {
  const editorRef = useRef(null);
  const [rtf, setRtf] = useState("");
  const log = async () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setRtf(editorRef.current.getContent());
      try {
        const data = await axios.put(
          "https://portfolio-builder-backend.herokuapp.com/user/edit_profile",
          {
            portfolio: editorRef.current.getContent(),
          },
          {
            headers: {
              "portfolio-builder":
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MWZkMzIyNWU3MWMzNGViZjc1M2I3NTciLCJ0eXBlIjoiVXNlciIsImlhdCI6MTY0Mzk4MzYyOSwiZXhwIjoxNjQ2NTc1NjI5fQ.Zsg2HLYHNl3VlXCAUw_orv5_eA1bThF6lJc1gib3c_4",
            },
          }
        );
        console.log(data);
      } catch {}
    }
  };
  return (
    <dev>
      <p style={{"padding-left": "4rm", margin: "0rem auto"}}>
        <span
          style={{"padding- left": "4rm", margin: "0rem auto"}}
          dangerouslySetInnerHTML={createMarkup(rtf)}
        ></span>
      </p>
      <>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            selector: "#richText",
            height: 800,
            menubar: true,
            plugins:
              "tabfocus contextmenu powerpaste hr advlist link autolink autosave code preview searchreplace wordcount media table emoticons image imagetools lineheight",
            toolbar:
              "undo redo hr |styleselect fontselect fontsizeselect| bold italic underline table | lineheight| alignleft aligncenter alignright alignjustify | bullist numblist outdent indent | link image media | forecolor backcolor emoticons customalign| code preview searchreplace",
            lineheight_formats:
              "single 4pt 5pt 6pt 8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt 22pt 24pt 26pt 36pt",
            fontsize_formats:
              "8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 18pt 20pt 22pt 24pt 26pt 28pt 30pt 32pt 36pt 40pt",
            branding: false,
            default_url: false,
            content_style:
              "body { margin: 0rem auto; padding-left : 4rem;padding-right : 4rem;padding-top : 2rem;padding-bottom : 2rem; max-width: 900 px; }",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <button onClick={log}>Submit</button>
      </>
    </dev>
  );
}
