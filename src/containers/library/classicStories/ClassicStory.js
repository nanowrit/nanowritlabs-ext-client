import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
// import { FormGroup, FormControl } from "react-bootstrap";
// import LoaderButton from "../../../components/LoaderButton";
import { s3Upload } from "../../../libs/awsLib";
import config from "../../../config";
import { GoInfo } from "react-icons/go";
import "../../../containers/Notes.css";
import { Collapse } from "react-bootstrap";

export default function ClassicStory(props) {
    const file = useRef(null);
    const [classicstory, setClassicStory] = useState(null);
    const [authorId, setAuthorId] = useState("");
    const [firstAppearedIn, setFirstAppearedIn] = useState("");
    const [firstAppearedDate, setFirstAppearedDate] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadClassicStory() {
      return API.get("classicStories", `/classicstorys/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const classicstory = await loadClassicStory();
        console.log(classicstory);
        const { 
          authorId, 
          firstAppearedIn, 
          firstAppearedDate,
          title, 
          content,
          attachment } = classicstory;

        if (attachment) {
          classicstory.attachmentURL = await Storage.vault.get(attachment);
        }

        setAuthorId(authorId);
        setFirstAppearedIn(firstAppearedIn);
        setFirstAppearedDate(firstAppearedDate);
        setTitle(title);
        setContent(content);
        setClassicStory(classicstory);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);



  function validateForm() {
    return authorId.length > 0 || firstAppearedIn.length > 0 || firstAppearedDate.length > 0 || title.length > 0 || content.length > 0;
  }
  
  // function formatFilename(str) {
  //   return str.replace(/^\w+-/, "");
  // }
  
  // function handleFileChange(event) {
  //   file.current = event.target.files[0];
  // }
  
  function saveClassicStory(classicstory) {
    return API.put("classicStories", `/classicstorys/${props.match.params.id}`, {
      body: classicstory
    });
  }
  
  async function handleSubmit(event) {
    let attachment;
  
    event.preventDefault();
  
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
  
    setIsLoading(true);
  
    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }
  
      await saveClassicStory({
        authorId,
        firstAppearedIn,
        firstAppearedDate,
        title,
        content,
        attachment: attachment || classicstory.attachment
      });
      props.history.push("/classicStories");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deleteClassicStory() {
    return API.del("classicStories", `/classicstorys/${props.match.params.id}`);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this classic story?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      await deleteClassicStory();
      props.history.push("/classicStories");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Notes">
      {classicstory && (
        <div>
        <div className="center">
          <h2 className="Aladin some-headspace">{classicstory.title}</h2>
            <h5 className="PT-Serif font-italic pale-silver">{classicstory.authorId}      <GoInfo onPointerEnter={() => setOpen(true)} onPointerLeave={() => setOpen(false)} /></h5>
              <Collapse in={open}>
                <div id="story-info">
                  <h6 className="pale-silver Cormorant-Garamond">First Appeared In: {classicstory.firstAppearedIn}</h6>
                  <h6 className="pale-silver Cormorant-Garamond">Date: {classicstory.firstAppearedDate}</h6>
                </div>
              </Collapse>
        </div>
        <div className="pale-silver story-content">
          {classicstory.content.split("\n").map((i, key) => {
            return <div className="pale-silver Crimson-Text" key={key}><br />{i}</div>;
          })}
        </div>
        </div>
        // <form onSubmit={handleSubmit}>
        //   <h2>{classicstory.title}</h2>
        //       <FormGroup controlId="authorId">
        //         <FormControl
        //           value={authorId}
        //           componentClass="textarea"
        //           onChange={e => setAuthorId(e.target.value)}
        //         />
        //       </FormGroup>
        //       <FormGroup controlId="firstAppearedIn">
        //         <FormControl
        //           value={firstAppearedIn}
        //           componentClass="textarea"
        //           onChange={e => setFirstAppearedIn(e.target.value)}
        //         />
        //       </FormGroup>
        //       <FormGroup controlId="firstAppearedDate">
        //         <FormControl
        //           value={firstAppearedDate}
        //           componentClass="textarea"
        //           onChange={e => setFirstAppearedDate(e.target.value)}
        //         />
        //       </FormGroup>
        //       <FormGroup controlId="title">
        //         <FormControl
        //           value={title}
        //           componentClass="textarea"
        //           onChange={e => setTitle(e.target.value)}
        //         />
        //       </FormGroup>
        //       <FormGroup controlId="content">
        //         <FormControl
        //           value={content}
        //           componentClass="textarea"
        //           onChange={e => setContent(e.target.value)}
        //         />
        //       </FormGroup>
          // {/* {beginning.attachment && (
          //   <FormGroup>
          //     <ControlLabel>Attachment</ControlLabel>
          //     <FormControl.Static>
          //       <a
          //         target="_blank"
          //         rel="noopener noreferrer"
          //         href={beginning.attachmentURL}
          //       >
          //         {formatFilename(beginning.attachment)}
          //       </a>
          //     </FormControl.Static>
          //   </FormGroup>
          // )} */}
          // <LoaderButton
          //   block
          //   type="submit"
          //   bsSize="large"
          //   bsStyle="primary"
          //   isLoading={isLoading}
          //   disabled={!validateForm()}
          // >
          //   Save
          // </LoaderButton>
          // <LoaderButton
          //   block
          //   bsSize="large"
          //   bsStyle="danger"
          //   onClick={handleDelete}
          //   isLoading={isDeleting}
          // >
          //   Delete
          // </LoaderButton>
        // </form>
      )}
    </div>
  );
}