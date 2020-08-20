import React from 'react';


import Home from '../pages/Home';
import AnnotateUploadedFile from '../pages/AnnotateUploadedFile';
import Share from '../pages/Share';
import UploadFile from '../pages/UploadFile';


import CreateDocument from "./CreateDocument";
import Page from "../components/Page";
import SideNav from "../components/SideNav";
import CircularProgress from "@material-ui/core/CircularProgress";
import Listing from "../components/Listing";

import '../App.css';
import { getFile } from '../api/index';

const initialCreateState = {
  step: 1,
  emails: [null],
  file: null,
  uploadedFile: null,
  isSuccessOpen: false,
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      path: null,
      documents: [],
      isLoading: true,
      tab: 'home',
      create: initialCreateState
    }

    this.handleNavigateHome = this.handleNavigateHome.bind(this)
  }

  componentDidMount() {
    // getFile().then(resp => console.log(resp));
  }

  handleNavigateHome() {
    this.setState({
      tab: 'home',
      path: null,
      create: initialCreateState
    })
  }

  getContent() {
    switch(this.state.path) {
      case 'create':
        return (
          <CreateDocument
            tab={this.state.tab}
            setTab={tab => {
              if (tab === 'home') {
                this.handleNavigateHome();
              } else {
                this.setState({ tab })
              }
            }}
            {...this.state.create}
            onNavigateHome={this.handleNavigateHome}
            onUpdateCreate={obj => {
              this.setState({
                create: {
                  ...this.state.create,
                  ...obj
                }
              })
            }}
          />
        );
      default:
        return (
          <Home
            tab={this.state.tab}
            setTab={this.props.setTab}
            documents={this.state.documents}
            onStartCreate={() =>
              this.setState({
                tab: null,
                path: 'create',
                create: {
                  ...this.state.create,
                  step: 1,
                }
              }
            )
            }
            // onNextClick={() => this.setState({ step: 1 })}
            // onAdvance={() => this.setState({ step })}
          />
        );
    }
  }

  render() {
    return this.getContent();
  }
}

export default App;
