import React from 'react';
import '../assets/css/App.css';
import Page from "./Page";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
    return (
        <Router>
            <Page/>
        </Router>
    );
}

export default App;
