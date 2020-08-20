import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from '../components/AppBar';

import Listing from '../components/Listing';
import SideNav from "../components/SideNav";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function Page({ children, nav, width, tab, setTab }) {
  const classes = useStyles();

  if (width === 'unset') {
    return (
      <div className={classes.root} style={{ height: '100vh' }}>
        <CssBaseline />
        <AppBar tab={tab} setTab={setTab} />
        <main style={{ flexGrow: 1 }}>
          <div className={clsx(classes.toolbar, "app-toolbar-spacer")} />
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar tab={tab} setTab={setTab} />
      {nav}
      <main className={clsx(classes.content, !nav ? "main-max" : "main-nav")}>
        <div className={clsx(classes.toolbar, "app-toolbar-spacer")} />
        {children}
      </main>
    </div>
  );
}
