import React, { useState } from "react";
import api from "../api";
import axios from "axios";

export default function SubmitPaper() {

  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [subject_area, setSubjectArea] = useState("");
  const [pdf, setPdf] = useState(null);
  const [msg, setMsg] = useState("");

  const [authors, setAuthors] = useState([
    { name: "", institute: "" },
  ]);



  function handleAuthorChange(index, field, value) {

    const updated = [...authors];
    updated[index][field] = value;
    setAuthors(updated);

  }



  function addAuthor() {

    setAuthors([...authors, { name: "", institute: "" }]);

  }



  function removeAuthor(index) {

    setAuthors(authors.filter((_, i) => i !== index));

  }



  async function handleSubmit(e) {

    e.preventDefault();

    try {

      if (!pdf) {
        alert("Please select a PDF first.");
        return;
      }


      for (const a of authors) {

        if (!a.name || !a.institute) {

          alert("Please fill all authors.");
          return;

        }

      }



      const authRes = await api.get("/api/files/upload_auth/");

      const { token, signature, expire, publicKey } = authRes.data;



      const formData = new FormData();

      formData.append("file", pdf);
      formData.append("fileName", pdf.name);
      formData.append("token", token);
      formData.append("signature", signature);
      formData.append("expire", expire);
      formData.append("publicKey", publicKey);
      formData.append("folder", "/Research_Papers");



      const uploadRes = await axios.post(

        "https://upload.imagekit.io/api/v1/files/upload",

        formData

      );



      const pdf_url = uploadRes.data.url;



      const keywordsArray = keywords

        .split(",")

        .map((k) => k.trim())

        .filter((k) => k.length > 0);



      await api.post("/api/papers/create/", {

        title,
        abstract,
        keywords: keywordsArray,
        subject_area,
        pdf_url,
        authors,

      });



      setMsg("Paper submitted successfully!");



      setTitle("");
      setAbstract("");
      setKeywords("");
      setSubjectArea("");
      setPdf(null);
      setAuthors([{ name: "", institute: "" }]);

    }

    catch (err) {

      console.error(err);
      alert("Upload failed");

    }

  }



  return (

    <div className="max-w-4xl mx-auto">


      {/* Card */}

      <div className="
        bg-white
        shadow-md
        rounded-xl
        border border-slate-200
        p-8
      ">


        {/* Header */}

        <h1 className="
          text-2xl
          font-bold
          text-slate-900
          mb-2
        ">
          Submit Paper
        </h1>


        <p className="
          text-slate-500
          text-sm
          mb-6
        ">
          Fill the details and upload your research paper
        </p>



        {msg && (

          <div className="
            mb-6
            bg-green-50
            text-green-700
            p-4
            rounded-lg
          ">

            {msg}

          </div>

        )}



        <form

          onSubmit={handleSubmit}

          className="space-y-6"

        >


          {/* Title */}

          <Input

            label="Title"

            value={title}

            setValue={setTitle}

          />



          {/* Abstract */}

          <TextArea

            label="Abstract"

            value={abstract}

            setValue={setAbstract}

          />



          {/* Authors */}

          <div>

            <label className="label">

              Authors

            </label>



            <div className="space-y-3">

              {authors.map((author, index) => (

                <div

                  key={index}

                  className="grid md:grid-cols-5 gap-3"

                >


                  <input

                    className="input md:col-span-2"

                    placeholder="Author Name"

                    value={author.name}

                    onChange={(e) =>
                      handleAuthorChange(index, "name", e.target.value)
                    }

                    required
                  />



                  <input

                    className="input md:col-span-2"

                    placeholder="Institute"

                    value={author.institute}

                    onChange={(e) =>
                      handleAuthorChange(index, "institute", e.target.value)
                    }

                    required
                  />



                  {index > 0 && (

                    <button

                      type="button"

                      onClick={() => removeAuthor(index)}

                      className="
                        text-red-600
                        border
                        rounded-lg
                        px-3
                      "

                    >

                      Remove

                    </button>

                  )}



                </div>

              ))}

            </div>



            <button

              type="button"

              onClick={addAuthor}

              className="
                mt-3
                text-blue-600
                font-medium
              "

            >

              + Add Co-Author

            </button>



          </div>



          <Input

            label="Keywords"

            value={keywords}

            setValue={setKeywords}

          />



          <Input

            label="Subject Area"

            value={subject_area}

            setValue={setSubjectArea}

          />



          {/* File */}

          <div>

            <label className="label">

              PDF Upload

            </label>



            <input

              type="file"

              accept="application/pdf"

              className="input"

              onChange={(e) =>
                setPdf(e.target.files?.[0] || null)
              }

            />

          </div>



          {/* Submit */}

          <button

            disabled={!pdf}

            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-lg
              font-medium
              transition
              disabled:opacity-50
            "

          >

            Submit Paper

          </button>



        </form>

      </div>

    </div>

  );

}



/* Reusable components */


function Input({ label, value, setValue }) {

  return (

    <div>

      <label className="label">

        {label}

      </label>

      <input

        className="input"

        value={value}

        onChange={(e) => setValue(e.target.value)}

        required

      />

    </div>

  );

}



function TextArea({ label, value, setValue }) {

  return (

    <div>

      <label className="label">

        {label}

      </label>

      <textarea

        rows="4"

        className="input"

        value={value}

        onChange={(e) => setValue(e.target.value)}

        required

      />

    </div>

  );

}
