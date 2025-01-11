import "./App.css";
import React, { useState } from "react";
import logo from "./logo.svg";
function sum(...args) {
  return args.reduce((a, b) => a + b);
}
function parseQueryParams(url) {
  const queryParams = {};
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
  } catch (error) {
    console.error("Invalid URL");
  }
  return queryParams;
}

function App() {
  // 3.	Do all requires that based on three variables as below
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
  ];

  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

  const person = {
    name: "Costas",
    address: {
      street: "Lalaland 12",
    },
  };
  const {
    address: { street },
  } = person;

  const newObject = {
    ...companies[0],
  };

  const [number, setNumber] = useState(0);
  const [unknowArray, setUnknowArray] = useState([]);

  const handleGenerate = (inputValue) => {
    setUnknowArray((prev) => [...prev, inputValue]);
  };

  const [counter, setCounter] = useState(0);
  const [url, setUrl] = useState("");
  const [queryParams, setQueryParams] = useState({});

  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleParseUrl = () => {
    const params = parseQueryParams(url);
    setQueryParams(params);
  };

  //----------------------------------------------
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>
          <span style={{ color: "black" }}>Hello </span>
          <span style={{ color: "blue", fontWeight: "bold" }}>React</span>
        </h1>
      </div>
      <div className="react-logo-card">
        <img src={logo} className="App-logo" alt="logo" />;
        <hr className="divider" />
        <p className="description">
          <strong>This is the React logo!</strong>
        </p>
        <p className="description2">
          <thin>i don't know why it is here either</thin>
        </p>
      </div>
      <div>
        <nav className="navbar">
          <ul className="nav-links">
            <li className="nav-item home">
              <a href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a href="#search">Search</a>
            </li>
            <li className="nav-item">
              <a href="#contact">Contact</a>
            </li>
            <li className="nav-item login">
              <a href="#login">Login</a>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <h1>Companies List</h1>
        <ul>
          {companies.map((company) => (
            <li key={company.name}>{company.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Companies Started After 1987</h1>
        <ul>
          {companies
            .filter((company) => company.start > 1987)
            .map((company) => (
              <li key={company.name}>{company.name}</li>
            ))}
        </ul>
      </div>
      <div>
        <h1>Companies with Category Retail</h1>
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Start Year</th>
              <th>End Year</th>
            </tr>
          </thead>
          <tbody>
            {companies
              .filter((company) => company.category === "Retail")
              .map((company) => (
                <tr key={company.name}>
                  <td>{company.name}</td>
                  <td>{company.start}</td>
                  <td>{company.end}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1>Sort the companies end date in ascending order</h1>
        <ul>
          {companies
            .sort((a, b) => a.end - b.end)
            .map((company) => (
              <li key={company.name}>
                {company.name} - {company.end}
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h1>Sort the ages array in descending </h1>
        <ul>
          {ages
            .sort((a, b) => b - a)
            .map((age) => (
              <li key={age}>{age}</li>
            ))}
        </ul>
      </div>
      <div>
        <h1>Sum id add all the ages use reduce</h1>
        <p>Sum of age: {ages.reduce((a, b) => a + b)}</p>
      </div>
      <div>
        <h1>Print New Object</h1>
        <p>{JSON.stringify(newObject)}</p>
      </div>
      <div>
        <h1>Create a function that takes an unknown number of arguments that are numbers and return their sum</h1>
        <p>Sum of 1, 2, 3, 4, 5: {sum(1, 2, 3, 4, 5)}</p>
        <h1>Add number in an array</h1>
      </div>
      <div>
        <input onChange={(e) => setNumber(e.target.value)} placeholder="Enter numbers" />
        <button onClick={() => handleGenerate(number)}>Generate</button>
      </div>
      <div>
        <h3>Generated Numbers :</h3>
        {unknowArray.map((num, index) => (
          <> {num}</>
        ))}
      </div>
      <div>
        <h1>Get the street value from the person object</h1>
        <p>Street: {street}</p>
      </div>
      <div>
        <h1>Increment Counter</h1>
        <p>Counter: {counter}</p>
        <button onClick={increment}>Increment</button>
      </div>
      <div>
        <h1>Parse URL Query Parameters</h1>
        <input type="text" value={url} onChange={handleUrlChange} placeholder="Enter URL" />
        <button onClick={handleParseUrl}>Parse URL</button>
        <h4>Query Parameters:</h4>
        <pre>{JSON.stringify(queryParams, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
