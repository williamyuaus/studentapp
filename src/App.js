import React, { useState } from 'react';
import './App.css';
import WeatherApp from './WeatherApp';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { AppBar } from '@material-ui/core';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddItem from "./AddItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function App() {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');

  const fetchData = () => {
    const url = `https://api.github.com/search/repositories?q=${keyword}`;
    fetch(url)
    .then(response => response.json())
    .then(responseData => {
      setData(responseData.items);
    });
  }

  const [items, setItems] = React.useState([]);

  const addItem = (item) => {
      setItems([item, ...items]);
  }

  const handleChange = (e) => {
    setKeyword(e.target.value);
  }

  const columns = [{
      Header: 'Name',
      accessor: 'full_name'
  }, {
      Header: 'URL',
      accessor: 'html_url',
  }, {
      Header: 'Owner',
      accessor: 'owner.login'
  }]

  const listItems = items.map((item, index) =>
      <ListItem key={index}>
          <ListItemText primary={item.product} secondary={item.amount} />
      </ListItem>
  );

  return (
    <div className="App">
      <WeatherApp />
      <AppBar position="static" color="default">
          <Toolbar>
              <Typography variant="h6" color="inherit">
                  Shopping list
              </Typography>
          </Toolbar>
      </AppBar>
      <AddItem addItem={addItem} />
      <List>{listItems}</List>
      <input type="text" onChange={handleChange} />
      <button onClick={fetchData} value={keyword} >fetch</button>
      <ReactTable data={data} columns={columns} />
    </div>
  );
}

export default App;
