import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import "../../Lander.css";
import { ListGroupItem, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { onError } from "../../../libs/errorLib";
import "../../Library.css"; 

export default function Instructionals(props) {
    // eslint-disable-next-line
    const [authors, setAuthors] = useState([{}]);
    const [instructionals, setInstructionals] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {

          try {
            const authors = await loadAuthors();
            const instructionals = await loadInstructionals();
            setAuthors(authors);
            setInstructionals(instructionals);

            } catch (e) {
                onError(e);
            }
            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated, props.isAdmin]);

    function loadInstructionals() {
        return API.get("instructionals", "/instructionals");
    }

    function loadAuthors() {
        return API.get("authors", "/authors");
    }

    function renderInstructionalsList(instructionals) {
        return [{}].concat(instructionals).map((instructional, i) => 
        i !== 0 ? (
            <LinkContainer 
                key={instructional.id} 
                to={`/the-craft/${instructional.id}`}
            >
                <ListGroupItem>
                    <h3>{instructional.title}</h3>
                    <header>by {instructional.authorId}</header>
                    <p className="Crimson-Text content">{instructional.content.trim().split("\n")[0]}..</p>
                </ListGroupItem>
            </LinkContainer>
        ) : (
            <div key="new"> 
                {
                    props.isAdmin ? (
                    <LinkContainer key="new" to="/the-craft/new">
                        <ListGroupItem>
                            <h4>
                                <b>{"\uFF0B"}</b> Add a story
                            </h4>
                        </ListGroupItem>
                    </LinkContainer>
                    ) : (
                        <div></div>
                    )
                }
            </div>
        )
        )
    }

    // eslint-disable-next-line
    // function renderClassicAuthorsList(authors) {
    //     return [{}].concat(authors)
    //         .sort(function (a, b) {
    //             let x = a.lastName;
    //             let y = b.lastName;
    //             if (x < y) {return -1;}
    //             if (x > y) {return 1;}
    //             return 0;
    //         })
    //         .map((author, i) =>
    //         i !== 0 ? (
    //             // <div></div>
    //             <LinkContainer key={i} to={`/authors/${author.id}`}>
    //                 <ListGroupItem >
    //                     <h3>{author.firstName} {author.middleName ? author.middleName : ""} {author.lastName}</h3>
    //                 </ListGroupItem>
    //             </LinkContainer>
    //         ) : (
    //             <LinkContainer key="new" to="/authors/new">
    //                 <ListGroupItem>
    //                     <h4>
    //                         <b>{"\uFF0B"}</b> Add an author
    //                     </h4>
    //                 </ListGroupItem>
    //           </LinkContainer>
    //         )
    //     )
    // }

    return (
        <div className="Library">
            <Breadcrumb>
            <Breadcrumb.Item as="div">
                <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item as="div">
                <Link to="/Library">Library</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active as="div">The Craft</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Articles Regarding the Craft</h1>
            {!isLoading && renderInstructionalsList(instructionals)}
            {/* <header>By Author</header>
            {!isLoading && renderClassicAuthorsList(authors)} */}
        </div>
      );
}