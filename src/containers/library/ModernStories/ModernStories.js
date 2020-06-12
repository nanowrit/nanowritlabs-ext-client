import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import "../../Lander.css";
import { ListGroupItem, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { onError } from "../../../libs/errorLib";
import "../../Library.css";

export default function Stories(props) {
    // eslint-disable-next-line
    const [authors, setAuthors] = useState([{}]);
    const [modernstorys, setModernStorys] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {

          try {
            const authors = await loadAuthors();
            const modernstorys = await loadModernStories();
            setAuthors(authors);
            setModernStorys(modernstorys);

            } catch (e) {
                onError(e);
            }
            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated, props.isAdmin]);

    function loadModernStories() {
        return API.get("modernStories", "/modernstorys");
    }

    function loadAuthors() {
        return API.get("authors", "/authors");
    }

    function renderModernStoriesList(modernstorys) {
        return [{}].concat(modernstorys).map((modernstory, i) => 
        i !== 0 ? (
            <LinkContainer 
                key={modernstory.id} 
                to={`/modernStories/${modernstory.id}`
            }>
                <ListGroupItem>
                    <h3>{modernstory.title}</h3>
                    <header>by {modernstory.authorId}</header>
                    <p className="Crimson-Text content">{modernstory.content.trim().split("\n")[0]}..</p>
                </ListGroupItem>
            </LinkContainer>
        ) : (
            <div key="new"> 
                {
                    props.isAdmin ? (
                        <LinkContainer key="new" to="/modernStories/new">
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
    function renderAuthorsList(authors) {
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
            <Breadcrumb>
            <Breadcrumb.Item as="div">
                <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item as="div">
                <Link to="/Library">Library</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active as="div">Modern Stories</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Modern Pulp Fiction Stories</h1>
            <header>By Original Print Date</header>
            {!isLoading && renderModernStoriesList(modernstorys)}
            {/* <header>By Author</header>
            {!isLoading && renderClassicAuthorsList(authors)} */}
        </div>
      );
}