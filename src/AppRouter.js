import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import SearchContainer from './containers/SearchContainer';

export default function AppRouter() {
    return (
        <Router>
            <Route path="/" exact component={SearchContainer} />
        </Router>
    )
}
