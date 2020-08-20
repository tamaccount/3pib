import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 'unset',
    // padding: '0 10px'
  },
  toolbar: theme.mixins.toolbar,
}));

function MockButtons() {
  return ['Drafts', 'Deleted'].map((text, index) => (
    <ListItem
      button
      key={text}
      selected={false}
      onClick={() => {}}
    >
      <ListItemIcon>
        {index % 2 === 0 ?
          <InboxIcon  /> :
          <MailIcon />
        }
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  ));
}

function SideNav ({ filter, onFilterChange, onStartCreate }) {
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      className={clsx(classes.drawer)}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={clsx(classes.toolbar, "app-toolbar-spacer")} />
      <Divider />
      <div
        style={{
          marginTop: 16,
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Button
          size="small"
          id="start-now"
          color="primary"
          variant="contained"
          onClick={onStartCreate}
          style={{ alignSelf: 'center' }}
        >
          Start Now
        </Button>
        <Typography
          variant="h6"
          component="h6"
          style={{ fontSize: '1rem' }}
        >
          Envelopes
        </Typography>
      </div>
      <List dense={true}>
        <ListItem
          button
          selected={filter === "inbox"}
          onClick={() => onFilterChange("inbox")}
        >
          <ListItemIcon>
            <InboxIcon  />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem
          button
          selected={filter === "sent"}
          onClick={() => onFilterChange("sent")}
        >
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItem>
        <MockButtons />
      </List>
      {/*<Divider />*/}
    </Drawer>
  );
}

export default SideNav;
