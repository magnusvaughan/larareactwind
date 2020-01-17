import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, useParams } from 'react-router-dom';
import Index from './Index';
import About from './About';
import New from './New';
import Show from './Show';

function App () {

    return(
        <main>
        <div className="container mx-auto">
            <nav className="flex items-center justify-between flex-wrap bg-gray-100 py-6 mb-8">
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-gray-900 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                    <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-900 hover:text-gray-600 mr-4">Home</Link>
                    <Link to="/new" className="block mt-4 lg:inline-block lg:mt-0 text-gray-900 hover:text-gray-600 mr-4">New</Link>
                    <Link to="/about" className="block mt-4 lg:inline-block lg:mt-0 text-gray-900 hover:text-gray-600 mr-4">About Me</Link>
                    </div>
                </div>
            </nav>
        </div>

        <Switch>
            <Route path="/" component={Index} exact />
            <Route path="/new" component={New} />
            <Route path="/about" component={About} />
            <Route path="/:id" component={Show} />
        </Switch>

        </main>
    );

}

if (document.getElementById('app')) {
    ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('app'));
}
