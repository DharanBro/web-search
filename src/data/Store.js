import React from 'react';

export const Store = React.createContext();

const initialState = {
    suggestions: [],
    activeSuggestion: 0
};

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_DATA':
            console.log(`FETCH_DATA`);
            return { ...state, suggestions: action.payload };
        case 'CHANGE_ACTIVE_SUGGESTION':
            console.log(`CHANGE_ACTIVE_SUGGESTION`);
            return { ...state, activeSuggestion: action.payload }
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}