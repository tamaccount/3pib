import React from 'react';

import AnnotateUploadedFile from '../pages/AnnotateUploadedFile';
import Share from '../pages/Share';
import UploadFile from '../pages/UploadFile';

class SignDocument extends React.Component {

  render() {
    return (
      <AnnotateUploadedFile
        isSuccessOpen={this.props.isSuccessOpen}
        onReturnHome={() => {
          this.props.onNavigateHome();
          this.props.onUpdateCreate({ step: 1, isSuccessOpen: false })
        }}
        tab={this.props.tab}
        onNextClick={() => this.props.onUpdateCreate({ isSuccessOpen: true })}
        onBackClick={() => this.props.onUpdateCreate({ step: 2 })}
      />
    );
  }
}

export default SignDocument;
