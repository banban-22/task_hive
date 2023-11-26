import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import './index.css';

// const client = new ApolloClient({
//   uri: 'https://flyby-router-demo.herokuapp.com/',
//   cache: new InMemoryCache(),
// });

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>
// );
