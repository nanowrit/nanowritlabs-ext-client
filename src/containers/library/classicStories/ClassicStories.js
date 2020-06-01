import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import "../../Lander.css";
import { ListGroupItem } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { onError } from "../../../libs/errorLib";
import "../../Library.css";

export default function Stories(props) {
    const [authors, setAuthors] = useState([{}]);
    const [classicstorys, setClassicstorys] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {

          try {
            const authors = await loadAuthors();
            const classicstorys = await loadClassicStories();
            setAuthors(authors);
            setClassicstorys(classicstorys);

            } catch (e) {
                onError(e);
            }
            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated, props.isAdmin]);

    function loadClassicStories() {
        return API.get("classicStories", "/classicstorys");
    }

    function loadAuthors() {
        return API.get("authors", "/authors");
    }

    function renderClassicStoriesList(classicstorys) {
        return [{}].concat(classicstorys).map((classicstory, i) => 
        i !== 0 ? (
            <LinkContainer 
                key={classicstory.id} 
                to={`/classicStories/${classicstory.id}`
            }>
                <ListGroupItem>
                    <h3>{classicstory.title}</h3>
                    <header>by {classicstory.authorId}</header>
                    <p className="Crimson-Text content">{classicstory.content.trim().split("\n")[0]}..</p>
                </ListGroupItem>
            </LinkContainer>
        ) : (
            <div key="new"> 
                {
                    props.isAdmin ? (
                        <LinkContainer key="new" to="/classicStories/new">
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

    function renderClassicAuthorsList(authors) {
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
                <LinkContainer key={i} to={`/authors/${author.id}`}>
                    <ListGroupItem >
                        <h3>{author.firstName} {author.middleName ? author.middleName : ""} {author.lastName}</h3>
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                <LinkContainer key="new" to="/authors/new">
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0B"}</b> Add an author
                        </h4>
                    </ListGroupItem>
              </LinkContainer>
            )
        )
    }

    return (
        <div className="Library">
            <h1>Classic Pulp Fiction Stories</h1>
            <header>By Original Print Date</header>
            {!isLoading && renderClassicStoriesList(classicstorys)}
            {/* <header>By Author</header>
            {!isLoading && renderClassicAuthorsList(authors)} */}
        </div>
      );
}