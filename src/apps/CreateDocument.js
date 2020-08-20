import React from 'react';

import AnnotateUploadedFile from '../pages/AnnotateUploadedFile';
import Share from '../pages/Share';
import UploadFile from '../pages/UploadFile';

class CreateDocument extends React.Component {

  render() {
    switch(this.props.step) {
      case 1:
        return (
          <UploadFile
            tab={this.props.tab}
            setTab={this.props.setTab}
            file={this.props.file}
            onChangeFile={file => {
              this.props.onUpdateCreate({ file })
            }}
            onChangeUploadedFile={file => {
              this.props.onUpdateCreate({ uploadedFile: file })
            }}
            onNextClick={() => this.props.onUpdateCreate({ step: 2 })}
            onBackClick={() => {
              this.props.onUpdateCreate({ step: 0 });
              this.props.onNavigateHome();
            }}
          />
        );
      case 2:
        return (
          <Share
            tab={this.props.tab}
            setTab={this.props.setTab}
            emails={this.props.emails}
            onChangeEmails={emails => this.props.onUpdateCreate({ emails })}
            onNextClick={() => this.props.onUpdateCreate({ step: 3 })}
            onBackClick={() => this.props.onUpdateCreate({ step: 1 })}
          />
        );
      case 3:
        return (
          <AnnotateUploadedFile
            isSuccessOpen={this.props.isSuccessOpen}
            onReturnHome={() => {
              this.props.onNavigateHome();
              this.props.onUpdateCreate({ step: 1, isSuccessOpen: false })
            }}
            uploadedFile={this.props.uploadedFile}
            tab={this.props.tab}
            setTab={this.props.setTab}
            onNextClick={() => this.props.onUpdateCreate({ isSuccessOpen: true })}
            onBackClick={() => this.props.onUpdateCreate({ step: 2 })}
          />
        );
    }
  }
}

export default CreateDocument;
