import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import TabList from '@material-ui/lab/TabList';
import TabContext from "@material-ui/lab/TabContext";


export default function Bar({ tab, setTab }) {
  // const classes = useStyles();
  //
  return (
    <TabContext value="home">
      <AppBar position="fixed" id="app-bar">
        <Toolbar>
          <Typography variant="h6" noWrap>
            ibSign
          </Typography>
          <TabList
            onChange={() => {}}
            style={{ marginLeft: 60 }}
            aria-label="simple tabs example"
          >
            <Tab label="Home" value="home" onClick={() => setTab('home')} />
            <Tab label="Manage" value="manage" />
          </TabList>
        </Toolbar>
      </AppBar>
    </TabContext>
  );
}
