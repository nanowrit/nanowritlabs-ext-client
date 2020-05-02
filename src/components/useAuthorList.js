import { useState, useEffect } from 'react';
import { onError } from '../libs/errorLib';
import { API } from 'aws-amplify';

export function useAuthorList() {
    const [authors, setAuthors] = useState([{}]);

    function loadAuthors() {
        return API.get("auhtors", "/authors");
    }
    
    setAuthors(loadAuthors);

    return authors;
}