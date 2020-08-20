import React from 'react';

import Page from '../components/Page';

import Listing from '../components/Listing';
import SideNav from "../components/SideNav";
import CircularProgress from '@material-ui/core/CircularProgress';

const getVisibleDocuments = (documents, username) => {
  return documents.filter(doc => {
    return true;
  });
}

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      filter: 'inbox',
      // documents: [],
      isLoading: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }

  render() {
    const visibleDocuments = getVisibleDocuments(this.props.documents);
    return (
      <Page
        tab={this.props.tab}
        setTab={this.props.setTab}
        nav={
          <SideNav
            filter={this.state.filter}
            onStartCreate={this.props.onStartCreate}
            onFilterChange={filter => this.setState({ filter })}
          />
        }
      >
        {this.state.isLoading
          ? (
            <div className="loading-container">
              <CircularProgress />
            </div>
          )
          : <Listing documents={visibleDocuments} />
        }
      </Page>
    );
  }
}

export default Home;
