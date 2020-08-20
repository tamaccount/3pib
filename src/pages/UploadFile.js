import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { uploadFile, baseUrl } from "../api";

import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Page from '../components/Page';

class UploadFile extends React.Component {

  constructor() {
    super();
  }

  fileUpload(onChangeUploadedFile){
    const file = this.props.file;

    if (file) {
      const reader = new FileReader();
      reader.onload = function() {
        const fileId = Date.now();
        const fileContent = reader.result;
        const [, fileData] = fileContent.split('data:application/pdf;base64,');

        const uploadURL = `${baseUrl}/${fileId}.pdf`;
        uploadFile(fileData, uploadURL)
          .then(() => onChangeUploadedFile({
            path: uploadURL,
            fileId
          }));
      }
      reader.readAsDataURL(file);
    }
  }

  render( ) {
    const {
      tab,
      setTab,
      onChangeFile,
      onNextClick,
      onBackClick,
      onChangeUploadedFile
    } = this.props;
    return (
      <Page tab={tab} setTab={setTab}>
        <Typography
          variant="h4"
          component="h4"
          style={{
            marginTop: '.5em',
            marginBottom: '1em'
          }}
        >
          Add Documents
        </Typography>
        <DropzoneArea
          style={{ minHeight: 450 }}
          onChange={files => {
            if (files[0]) {
              onChangeFile(files[0]);
            }
          }}
        />
        <div
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={onBackClick}
          >
            Back
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={() => {
              this.fileUpload(onChangeUploadedFile);
              onNextClick();
            }}
            style={{ marginLeft: 12 }}
          >
            Next
          </Button>
        </div>
      </Page>
    )
  }
}

export default UploadFile;
