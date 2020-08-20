import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import { makeStyles } from '@material-ui/core/styles';

import Page from '../components/Page';

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// rectangleAnnot.X = 100;
// rectangleAnnot.Y = 150;
// rectangleAnnot.Width = 200;
// rectangleAnnot.Height = 50;
// {
//   "X": 104.35,
//   "Y": 342.03,
//   "Width": 110.14000000000001,
//   "Height": 25.510000000000048,
//   "Subject": "Rectangle",
//   "PageNumber": 2
// }

const useStyles = makeStyles(() => ({
  appBar: {
    top: "auto",
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
}));

function SuccessDialog({ isOpen, onReturnHome }) {
  return (
    <Dialog open={isOpen} onClose={onReturnHome}>
      <DialogTitle>Email Sent</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You will be notified via email when the recipients update your document.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onReturnHome}
          size="small"
          color="secondary"
          variant="contained"
        >
          Return Home
        </Button>

      </DialogActions>
    </Dialog>
  );
}

function ActionBar({
  onBackClick,
  onNextClick,
}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        color="primary"
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar component="div" id="bottom-action-bar">
          <div className={classes.grow} />
          <Button
            size="small"
            variant="contained"
            onClick={onBackClick}
          >
            Back
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={onNextClick}
            style={{ marginLeft: 12 }}
          >
            Send
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

const AnnotateUploadedFile = ({
  tab,
  setTab,
  onBackClick,
  onNextClick,
  uploadedFile,
  isSuccessOpen,
  onReturnHome,
  initialCoordinates,
}) => {
  const viewer = useRef(null);
  const path = `https://hack.sandbox.instabase.com/mohit/ibsign/fs/Instabase%20Drive/${uploadedFile.fileId}.pdf?content-disposition=raw`
  // console.log(`https://localhost/tamba/my-repo/fs/Instabase%20Drive/${uploadedFile.fileId}.pdf?content-disposition=raw`)
  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        // initialDoc: `https://localhost/tamba/my-repo/fs/Instabase%20Drive/${uploadedFile.fileId}.pdf?content-disposition=raw`,
        // initialDoc: `https://localhost/tamba/my-repo/fs/Instabase%20Drive/Independent%20Contractor%20Agreement.pdf?content-disposition=raw`,
        // initialDoc: `https://localhost/tamba/my-repo/fs/Instabase%20Drive/paper.pdf?content-disposition=raw`,
        initialDoc: path,
      },
      viewer.current,
    ).then((instance) => {
      const { docViewer, Annotations } = instance;
      const annotManager = docViewer.getAnnotationManager();

      annotManager.on('annotationChanged', (annotations, action) => {
        try {
          const rectangleAnnot = annotations[0];
          const { X, Y, Width, Height, Subject, PageNumber } = rectangleAnnot;
          console.log(rectangleAnnot)
          console.log({ X, Y, Width, Height, Subject, PageNumber })
        } catch (e) {
          console.log(e);
        }
      });

      if (initialCoordinates) {
        docViewer.on('documentLoaded', () => {
          const rectangleAnnot = new Annotations.RectangleAnnotation();

          rectangleAnnot.PageNumber = initialCoordinates.PageNumber;
          rectangleAnnot.X = initialCoordinates.X;
          rectangleAnnot.Y = initialCoordinates.Y;
          rectangleAnnot.Width = initialCoordinates.Width;
          rectangleAnnot.Height = initialCoordinates.Height;

          rectangleAnnot.Author = annotManager.getCurrentUser();

          annotManager.addAnnotation(rectangleAnnot);
          // need to draw the annotation otherwise it won't show up until the page is refreshed
          annotManager.redrawAnnotation(rectangleAnnot);
        });
      }
    });
  }, []);

  return (
    <Page width="unset" tab={tab} setTab={setTab}>
      <div className="webviewer" ref={viewer} >
      </div>
      <SuccessDialog isOpen={isSuccessOpen} onReturnHome={onReturnHome} />
      <ActionBar
        onBackClick={onBackClick}
        onNextClick={onNextClick}
      />
    </Page>
  );
};

export default AnnotateUploadedFile;
