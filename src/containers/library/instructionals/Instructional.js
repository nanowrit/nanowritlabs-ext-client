import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { Breadcrumb, FormGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoaderButton from "../../../components/LoaderButton";
import { s3Upload } from "../../../libs/awsLib";
import config from "../../../config";
import { GoInfo } from "react-icons/go";
import "../../../containers/Notes.css";
import { Collapse } from "react-bootstrap"; 

export default function Instructional(props) {
    const file = useRef(null);
    const [instructional, setInstructional] = useState(null);
    const [authorId, setAuthorId] = useState("");
    const [firstAppearedIn, setFirstAppearedIn] = useState("");
    const [firstAppearedDate, setFirstAppearedDate] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(true);
    // eslint-disable-next-line
    const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadInstructional() {
      return API.get("instructionals", `/instructionals/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const instructional = await loadInstructional();
        const { 
          authorId, 
          firstAppearedIn, 
          firstAppearedDate,
          title, 
          content,
          attachment } = instructional;

        if (attachment) {
            instructional.attachmentURL = await Storage.vault.get(attachment);
        }

        setAuthorId(authorId);
        setFirstAppearedIn(firstAppearedIn);
        setFirstAppearedDate(firstAppearedDate);
        setTitle(title);
        setContent(content);
        setInstructional(instructional);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id, props.isAdmin]);


  // eslint-disable-next-line
  function validateForm() {
    return authorId.length > 0 || firstAppearedIn.length > 0 || firstAppearedDate.length > 0 || title.length > 0 || content.length > 0;
  }
  
  // function formatFilename(str) {
  //   return str.replace(/^\w+-/, "");
  // }
  
  // function handleFileChange(event) {
  //   file.current = event.target.files[0];
  // }
  
  function saveInstructional(instructional) {
    return API.put("instructionals", `/instructionals/${props.match.params.id}`, {
      body: instructional
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
  
      await saveInstructional({
        authorId,
        firstAppearedIn,
        firstAppearedDate,
        title,
        content,
        attachment: attachment || instructional.attachment
      });
      props.history.push("/the-craft");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  // eslint-disable-next-line
  function deleteInstructional() {
    return API.del("instructionals", `/instructionals/${props.match.params.id}`);
  }
  
  // eslint-disable-next-line
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this instructional article?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      await deleteInstructional();
      props.history.push("/the-craft");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Notes">
      {instructional && (
          <div>
            <div>
                <Breadcrumb>
                <Breadcrumb.Item as="div">
                        <Link to="/">Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item as="div">
                        <Link to="/Library">Library</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item as="div">
                        <Link to="/the-craft">The Craft</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{`${instructional.title}     `}
                    <GoInfo className="pale-silver" 
                        onClick={() => setOpen(!open)}
                        // onPointerEnter={() => setOpen(true)} 
                        // onPointerLeave={() => setOpen(false)} 
                    />
                    </Breadcrumb.Item>
                </Breadcrumb>
                { 
                    props.isAdmin ? (
                        <form onSubmit={handleSubmit}>
                            {/* <h2>{instructional.title}</h2> */}
                            <h4>Author</h4>
                            <FormGroup controlId="authorId">
                                <FormControl
                                value={authorId}
                                as="input"
                                onChange={e => setAuthorId(e.target.value)}
                                />
                            </FormGroup>
                            <h4>Where was it first published?</h4>
                            <FormGroup controlId="firstAppearedIn">
                                <FormControl
                                value={firstAppearedIn}
                                as="input"
                                onChange={e => setFirstAppearedIn(e.target.value)}
                                />
                            </FormGroup>
                            <h4>When was it first published?</h4>
                            <FormGroup controlId="firstAppearedDate">
                                <FormControl
                                value={firstAppearedDate}
                                as="input"
                                onChange={e => setFirstAppearedDate(e.target.value)}
                                />
                            </FormGroup>
                            <h4>Title</h4>
                            <FormGroup controlId="title">
                                <FormControl
                                value={title}
                                as="input"
                                onChange={e => setTitle(e.target.value)}
                                />
                            </FormGroup>
                            <h4>The Content</h4>
                            <FormGroup controlId="content">
                                <FormControl
                                value={content}
                                as="textarea"
                                onChange={e => setContent(e.target.value)}
                                />
                            </FormGroup>
                        {/* {beginning.attachment && (
                            <FormGroup>
                            <ControlLabel>Attachment</ControlLabel>
                            <FormControl.Static>
                                <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={beginning.attachmentURL}
                                >
                                {formatFilename(beginning.attachment)}
                                </a>
                            </FormControl.Static>
                            </FormGroup>
                        )} */}
                        <LoaderButton
                            block
                            type="submit"
                            size="large"
                            variant="primary"
                            isLoading={isLoading}
                            disabled={!validateForm()}
                        >
                            Save
                        </LoaderButton>
                        <LoaderButton
                            block
                            size="large"
                            variant="danger"
                            onClick={handleDelete}
                            isLoading={isDeleting}
                        >
                            Delete
                        </LoaderButton>
                    </form>
                    ) : (
                        <div>
                        <div className="center">
                            <Collapse in={open}>
                                <div id="story-info">
                                <h3 className="pale-silver Aladin">{instructional.title}</h3>
                                <h5 className="PT-Serif font-italic pale-silver">by {instructional.authorId}</h5>
                                <h6 className="pale-silver Cormorant-Garamond">First Appeared In: {instructional.firstAppearedIn}</h6>
                                <h6 className="pale-silver Cormorant-Garamond">Date: {instructional.firstAppearedDate}</h6>
                                </div>
                            </Collapse>
                        </div>
                        <div className="pale-silver story-content">
                        {instructional.content.split("\n").map((i, key) => {
                            return <div className="pale-silver Crimson-Text" key={key}><br />{i}</div>;
                        })}
                        </div>
                        </div>
                    )
                }
            </div>
        </div>
      )}
    </div>
  );
}