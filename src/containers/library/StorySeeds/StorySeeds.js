import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import "../../Lander.css";
import { ListGroupItem, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { onError } from "../../../libs/errorLib";
import "../../Library.css"; 

export default function StorySeeds(props) {
    // eslint-disable-next-line
    const [authors, setAuthors] = useState([{}]);
    const [storySeeds, setStorySeeds] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {

          try {
            const authors = await loadAuthors();
            const storySeeds = await loadStorySeeds();
            setAuthors(authors);
            setStorySeeds(storySeeds);

            } catch (e) {
                onError(e);
            }
            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated, props.isAdmin]);

    function loadStorySeeds() {
        return API.get("storySeeds", "/storyseeds");
    }

    function loadAuthors() {
        return API.get("authors", "/authors");
    }

    function renderStorySeedsList(storySeeds) {
        return [{}].concat(storySeeds).map((storySeed, i) => 
        i !== 0 ? (
            <LinkContainer 
                key={storySeed.id} 
                to={`/storyseeds/${storySeed.storySeedId}`}
            >
                <ListGroupItem>
                    <h3>{storySeed.title}</h3>
                    <header>{ storySeed.authorId ?  "by" : "" } {storySeed.authorId}</header>
                    <p className="Crimson-Text content">{storySeed.content.trim().split("\n")[0]}..</p>
                </ListGroupItem>
            </LinkContainer>
        ) : (
            <div key="new"> 
                {
                    props.isAdmin ? (
                    <LinkContainer key="new" to="/storySeeds/new">
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
            <Breadcrumb.Item active as="div">Story Seeds</Breadcrumb.Item>
            </Breadcrumb>
            <h1>A Collection of News Articles</h1>
            <h3>Curated to Inspire Fiction</h3>
            {/* <header>By Original Print Date</header> */}
            {!isLoading && renderStorySeedsList(storySeeds)}
            {/* <header>By Author</header>
            {!isLoading && renderClassicAuthorsList(authors)} */}
        </div>
      );
}