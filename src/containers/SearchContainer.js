import React from 'react'

import styles from './SearchContainer.module.css'

import Input from '../components/Input'
import { Store } from '../data/Store';

import { SUGGESTIONS_URL } from '../utils/cosntants'
import Suggestions from '../components/Suggestions';

export default function Search() {
    const { state, dispatch } = React.useContext(Store);
    let { activeSuggestion } = state;
    const [suggestionsDisplay, setSuggestionsDisplay] = React.useState(false);

    const fetchDataAction = async (q) => {
        if (q === "") {
            setSuggestionsDisplay(false);
            dispatch({
                type: 'FETCH_DATA',
                payload: []
            });
            dispatch({
                type: 'CHANGE_ACTIVE_SUGGESTION',
                payload: 0
            });
            return;
        }
        setSuggestionsDisplay(true);
        const data = await fetch(`${SUGGESTIONS_URL}?text=${q}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
                "x-rapidapi-key": "06a0b2c026mshb66d966a3213d8ep13b1e8jsn7ee50d0638b8"
            }
        })
        const dataJSON = await data.json();
        return dispatch({
            type: 'FETCH_DATA',
            payload: dataJSON
        });
    };

    const changeActiveSuggestion = (event) => {
        let code;
        if (event.key !== undefined) {
            code = event.key;
        } else if (event.keyIdentifier !== undefined) {
            code = event.keyIdentifier;
        } else if (event.keyCode !== undefined) {
            code = event.keyCode;
        }
        switch (code) {
            case "ArrowUp":
                event.preventDefault();
                return dispatch({
                    type: 'CHANGE_ACTIVE_SUGGESTION',
                    payload: activeSuggestion > 0 ? --activeSuggestion : 0
                });
            case "ArrowDown":
                event.preventDefault();
                return dispatch({
                    type: 'CHANGE_ACTIVE_SUGGESTION',
                    payload: activeSuggestion < 9 ? ++activeSuggestion : 9
                });
            default:
                return;
        }
    };

    return (
        <div className={styles.wrapper}>
            <small>SEARCH SOMETHING</small>
            <div className={styles.searchInput}>
                <i className="fas fa-search"></i>
                <Input
                    autoFocus
                    onKeyDown={changeActiveSuggestion}
                    onChange={(event) => fetchDataAction(event.target.value)}
                    // onBlur={() => fetchDataAction("")}
                    placeholder="Just type it" />
            </div>
            {suggestionsDisplay ? <Suggestions /> : null}
        </div>
    )
}
