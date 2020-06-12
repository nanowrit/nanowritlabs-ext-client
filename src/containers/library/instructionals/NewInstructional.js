import React, { useState, useEffect } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import { API } from "aws-amplify";
import LoaderButton from "../../../components/LoaderButton";
import { onError } from "../../../libs/errorLib";
// import config from "../../config";
import "../../../containers/NewNote.css";

export default function NewInstructional(props) {
//   const file = useRef(null);
  const [authors, setAuthors] = useState([{}]);
  const [authorId, setAuthorId] = useState("");
  const [firstAppearedIn, setFirstAppearedIn] = useState("");
  const [firstAppearedDate, setfirstAppearedDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return title.length > 0 && content.length > 0;
  }

  useEffect(() => {
    async function onLoad() {

      try {
        const authors = await loadAuthors();
        setAuthors(authors);

        } catch (e) {
            onError(e);
        }
        setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  // function handleFileChange(event) {
  //   file.current = event.target.files[0];
  // }

  function loadAuthors() {
    return API.get("authors", "/authors");
  }

  function renderClassicAuthorsDLList(authors) {
    return [{}].concat(authors)
        .sort(function (a, b) {
            let x = a.lastName;
            let y = b.lastName;
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        })
        .map((author, i) =>
        i !== 0 ? (
            // <div></div>
            <option value={author.authorId}>{author.firstName} {author.middleName} {author.lastName}</option>
        ) : (
            <option value="select">select</option>
        )
    )
}

  async function handleSubmit(event) {
    event.preventDefault();
  
    // if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
    //   alert(
    //     `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
    //       1000000} MB.`
    //   );
    //   return;
    // }
  
    setIsLoading(true);
  
    try {
    //   const attachment = file.current
    //     ? await s3Upload(file.current)
    //     : null;
  
      await createInstructional(
        { 
          authorId,
          firstAppearedIn,
          firstAppearedDate,
          title,
          content
        });
      props.history.push("/the-craft");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createInstructional(instructional) {
    return API.post("instructionals", "/instructionals", {
      body: instructional
    });
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <h2 className="some-headspace">Add a How-To Pulp Fiction Arcticle</h2>
            <FormGroup controlId="authorId">
              <h4>Who Wrote It?</h4>
              <FormControl
                value={authorId}
                as="select"
                onChange={e => setAuthorId(e.target.value)}
              >
                {!isLoading && renderClassicAuthorsDLList(authors)}
              </FormControl>
            </FormGroup>
            <FormGroup controlId="firstAppearedIn">
            <h4>Where was it first published?</h4>
              <FormControl
                value={firstAppearedIn}
                as="input"
                type="string"
                onChange={e => setFirstAppearedIn(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="firstAppearedDate">
            <h4>When was it first published?</h4>
              <FormControl
                value={firstAppearedDate}
                type="date"
                onChange={e => setfirstAppearedDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="title">
              <h4>Title</h4>
              <FormControl
                value={title}
                as="input"
                type="text"
                onChange={e => setTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="content">
              <h4>The Content</h4>
              <FormControl
                value={content}
                as="textarea"
                onChange={e => setContent(e.target.value)}
              />
            </FormGroup>

        <LoaderButton
          block
          type="submit"
          size="large"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Add
        </LoaderButton>
      </form>
    </div>
  );
}