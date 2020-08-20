import { get } from 'lodash';
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import moment from 'moment';
import { useAsyncReducer } from 'IBApi';
import Webcam from 'react-webcam';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';
import html2canvas from 'html2canvas';
import {
  Button,
  Paper,
  TextField,
  CircularProgress,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Fade,
  Dialog,
  makeStyles,
} from '@material-ui/core';
import reducer, { initialState } from './reducer';
import {
  SET_MODE,
  PROCESS_CHECKIN_IMAGE,
  SET_FIELD,
  COMPLETE_CHECKIN,
  SET_CHECKIN_STEP,
} from './constants';
import { processCheckinImage, completeCheckin } from './WorkplaceApi';

const WorkplaceContext = createContext();

const useStyles = makeStyles(theme => ({
  home: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    flexDirection: 'column',
    fontSize: theme.typography.h5.fontSize,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  modeSelect: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.typography.h5.fontSize,
  },
  webcam: {},
  webcamContainer: {
    position: 'relative',
    width: '1280px',
    height: '720px',
    margin: 'auto',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  webcamControls: {
    '& > *': {
      margin: theme.spacing(1),
    },
    position: 'absolute',
    backgroundColor: 'black',
    width: '100%',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: theme.typography.h3.fontSize,
  },
  webcamFrame: {
    position: 'absolute',
    top: 'calc(50%)',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '450px',
    width: '720px',
    border: '10px solid yellow',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkinFormContainer: {
    height: 'calc(100% - 20px)',
    padding: 20,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    width: '80vw',
  },
  checkinField: { marginRight: 20, minWidth: 166 },
  ibLogo: {
    backgroundImage: 'url(/static/assets/images/logo-color.png)',
    backgroundRepat: 'no-repeat',
    backgroundSize: '60px 60px',
    backgroundPosition: 'center center',
    width: '60px',
    height: '60px',
    margin: '10px',
  },
}));

function Workplace() {
  const [state, dispatch] = useAsyncReducer(reducer, initialState, {
    [PROCESS_CHECKIN_IMAGE]: processCheckinImage,
    [COMPLETE_CHECKIN]: completeCheckin,
  });

  const { mode, checkinStep, checkinFields, loadStates, idImage } = state;

  const setMode = toMode =>
    dispatch({
      type: SET_MODE,
      mode: toMode,
    });

  const processCheckInImage = image =>
    dispatch({
      type: PROCESS_CHECKIN_IMAGE,
      image,
    });

  const setField = (key, value) =>
    dispatch({
      type: SET_FIELD,
      key,
      value,
    });

  const onCompleteCheckIn = async () => {
    const ndaContainer = document.querySelector('#nda-container');
    ndaContainer.scrollTop = 0;
    dispatch({
      type: SET_CHECKIN_STEP,
      step: 2,
    });
    const canvas = await html2canvas(ndaContainer);
    dispatch({
      type: COMPLETE_CHECKIN,
      ndaImage: canvas.toDataURL(),
      idImage,
      fields: checkinFields,
    });
  };

  const content = {
    home: <WorkplaceHome />,
    'check-in': <CheckIn />,
  }[mode];

  const workplaceContext = {
    setField,
    processCheckInImage,
    setMode,
    checkinStep,
    checkinFields,
    loadStates,
    onCompleteCheckIn,
  };
  return (
    <WorkplaceContext.Provider value={workplaceContext}>
      <div
        style={{
          backgroundImage: `url(/static/assets/images/desktop-bg-1.svg)`,
          backgroundSize: 'contain',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        {content}
      </div>
    </WorkplaceContext.Provider>
  );
}

export default Workplace;
export { WorkplaceContext };

function WorkplaceHome() {
  const { setMode } = useContext(WorkplaceContext);
  const classes = useStyles();
  return (
    <div className={`${classes.home} home__background`}>
      <img
        src="/static/assets/images/wordmark-black.png"
        alt="Instabase"
        className="home__logo"
      />
      <div className="home__desktop-message">Hi Welcome to Instabase.</div>
      <Button
        variant="contained"
        elevation={2}
        onClick={() => setMode('check-in')}
        color="primary"
      >
        Click Here to Check In
      </Button>
    </div>
  );
}

function CheckIn() {
  const { checkinStep } = useContext(WorkplaceContext);
  const content = [<CheckInCamera />, <CheckInForm />, <CheckInComplete />][
    checkinStep
    ];
  return content;
}

function CheckInComplete() {
  const classes = useStyles();
  const { checkinFields } = useContext(WorkplaceContext);
  return (
    <Paper
      elevation={4}
      style={{
        height: '50vh',
        width: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h2>Thanks for checking in!</h2>
      <h2>{checkinFields.host} will be right with you.</h2>
      <div className={classes.ibLogo} />
    </Paper>
  );
}

function CheckInCamera() {
  const { processCheckInImage, loadStates } = useContext(WorkplaceContext);
  const classes = useStyles();
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(null);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  };
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const canvas = document.createElement('canvas');
    canvas.height = 450;
    canvas.width = 720;
    const context = canvas.getContext('2d');
    const img = document.createElement('img');
    img.onload = () => {
      const sX = (1280 - 720) / 2;
      const sY = (720 - 450) / 2;
      context.drawImage(img, sX, sY, 720, 450, 0, 0, 720, 450);
      setImage(canvas.toDataURL());
    };
    img.src = imageSrc;
  }, [webcamRef]);

  return (
    <div className={classes.webcamContainer}>
      {image ? (
        <>
          <img
            src={image}
            style={{
              position: 'absolute',
              top: 'calc(50%)',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div
            className={classes.webcamFrame}
            style={{
              border: '10px solid green',
            }}
          >
            {loadStates[PROCESS_CHECKIN_IMAGE] ? (
              <Paper
                style={{
                  height: '50%',
                  width: '50%',
                  margin: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  flexDirection: 'column',
                }}
              >
                <h3>Checking you in...</h3>
                <CircularProgress />
              </Paper>
            ) : null}
          </div>
          <div className={classes.webcamControls} style={{ bottom: 0 }}>
            <Button
              variant="contained"
              onClick={() => setImage(null)}
              size="large"
              color="secondary"
            >
              Retake
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                processCheckInImage(image);
              }}
              size="large"
              color="primary"
            >
              Submit
            </Button>
          </div>
        </>
      ) : (
        <>
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            screenshotQuality={1}
            videoConstraints={videoConstraints}
            className={classes.webcam}
          />
          <div className={classes.webcamFrame} />
          <div className={classes.webcamControls} style={{ bottom: 0 }}>
            <Button variant="contained" onClick={capture} size="large">
              Capture
            </Button>
          </div>
        </>
      )}
      <div className={classes.webcamControls} style={{ top: 0 }}>
        Please take a photo of your ID
      </div>
    </div>
  );
}

const fields = [
  {
    label: 'Last Name',
    key: 'last_name',
  },
  {
    label: 'First Name',
    key: 'first_name',
  },
  {
    label: 'Expiration Date',
    key: 'exp_date',
  },
  {
    label: 'Birth Date',
    key: 'birth_date',
  },
  {
    label: 'Licence #',
    key: 'dl_num',
  },
];
function CheckInForm() {
  const { checkinFields, setField, onCompleteCheckIn, loadStates } = useContext(
    WorkplaceContext
  );
  const [showArr, setShowArr] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const timeoutIds = [];
    for (let i = 0; i < 7; i++) {
      timeoutIds[i] = setTimeout(() => {
        setShowArr(prev => {
          const newArr = [...prev];
          newArr[i] = true;
          return newArr;
        });
      }, i * 200);
    }
  }, []);
  return (
    <Paper className={classes.checkinFormContainer} elevation={4}>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={loadStates[COMPLETE_CHECKIN]}
      >
        Checking you in... <CircularProgress />
      </Dialog>
      <div style={{ flex: 'none' }}>
        {fields.map(({ label, key }, i) => (
          <Fade in={showArr[i]} timeout={1500}>
            <TextField
              size="medium"
              id={key}
              label={label}
              value={checkinFields[key]}
              margin="normal"
              onChange={e => {
                setField(key, e.currentTarget.value);
              }}
              className={classes.checkinField}
            />
          </Fade>
        ))}
      </div>
      <div style={{ flex: 'none' }}>
        <Fade in={showArr[5]} timeout={1500}>
          <TextField
            style={{ width: 352 }}
            size="medium"
            id="address"
            label="Address"
            value={checkinFields.address}
            margin="normal"
            onChange={e => {
              setField('address', e.currentTarget.value);
            }}
            className={classes.checkinField}
          />
        </Fade>
        <Fade in={showArr[6]} timeout={1500}>
          <FormControl margin="normal" className={classes.checkinField}>
            <InputLabel id="host-label">Host</InputLabel>
            <Select
              labelId="host-label"
              id="host-select"
              value={checkinFields.host || 'default'}
              onChange={e => {
                setField('host', e.target.value);
              }}
            >
              <MenuItem value="default">Select A Host</MenuItem>
              <MenuItem value="Jesika">Jesika H.</MenuItem>
              <MenuItem value="Mohit">Mohit C.</MenuItem>
              <MenuItem value="Karthik">Karthik S.</MenuItem>
              <MenuItem value="Eric">Eric H.</MenuItem>
              <MenuItem value="Lydia">Lydia G.</MenuItem>
              <MenuItem value="Anant">Anant B.</MenuItem>
              <MenuItem value="Hari">Hari T.</MenuItem>
              <MenuItem value="Will">Will L.</MenuItem>
              <MenuItem value="Greg">Greg L.</MenuItem>
              <MenuItem value="Laura">Laura B.</MenuItem>
            </Select>
          </FormControl>
        </Fade>
      </div>

      <DocViewer />
      <div style={{ flex: 'none', textAlign: 'center', marginTop: '10px' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={onCompleteCheckIn}
        >
          Check In
        </Button>
      </div>
    </Paper>
  );
}

function DocViewer() {
  const { checkinFields } = useContext(WorkplaceContext);
  const sigPos = {
    w: 0.3,
    h: 0.05,
    l: 0.265,
    t: 0.65,
  };
  const [isPaint, setIsPaint] = useState(false);
  const [sigPix, setSigPix] = useState({});
  const [namePix, setNamePix] = useState({});
  const [datePix, setDatePix] = useState({});
  const stageRef = useRef(null);
  const layerRef = useRef(null);
  const lastLineRef = useRef(null);
  const imgRef = useRef(null);
  function handleMouseDown() {
    setIsPaint(true);
    const pos = stageRef.current.getPointerPosition();
    lastLineRef.current = new Konva.Line({
      stroke: '#df4b26',
      strokeWidth: 5,
      globalCompositeOperation: 'source-over',
      points: [pos.x, pos.y],
    });
    layerRef.current.add(lastLineRef.current);
  }

  function handleMouseUp() {
    setIsPaint(false);
    lastLineRef.current = null;
  }

  function handleMouseMove() {
    if (!isPaint) {
      return;
    }

    const pos = stageRef.current.getPointerPosition();
    const newPoints = lastLineRef.current.points().concat([pos.x, pos.y]);
    lastLineRef.current.points(newPoints);
    layerRef.current.batchDraw();
  }

  function setSigPixels() {
    const w = imgRef.current.width * sigPos.w;
    const h = imgRef.current.height * sigPos.h;
    const l = imgRef.current.width * sigPos.l;
    const t = imgRef.current.height * sigPos.t;
    setSigPix({
      w,
      h,
      l,
      t,
    });

    const nl = imgRef.current.width * (sigPos.l + 0.023);
    const nt = imgRef.current.height * (sigPos.t + 0.065);
    const dl = imgRef.current.width * (sigPos.l + 0.37);
    const dt = imgRef.current.height * (sigPos.t + 0.065);
    setNamePix({
      l: nl,
      t: nt,
    });
    setDatePix({
      l: dl,
      t: dt,
    });
  }

  return (
    <>
      <h4>Read and Sign the NDA</h4>
      <div
        style={{
          width: '100%',
          overflow: 'scroll',
          padding: '10px',
          border: '1px solid black',
        }}
      >
        <div
          id="nda-container"
          style={{
            width: '100%',
            position: 'relative',
            boxSizing: 'border-box',
          }}
        >
          <img
            ref={imgRef}
            onLoad={setSigPixels}
            style={{ width: '100%' }}
            src="/mohit/instahack-2020/fs/Instabase%20Drive/nda.png?content-disposition=raw"
          />
          <div
            style={{
              position: 'absolute',
              top: sigPix.t,
              left: sigPix.l,
              border: '1px solid black',
              width: sigPix.w,
              height: sigPix.h,
            }}
          >
            <Stage
              width={sigPix.w}
              height={sigPix.h}
              ref={stageRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
              onTouchMove={handleMouseMove}
            >
              <Layer ref={layerRef} />
            </Stage>
          </div>
          <h3
            style={{ position: 'absolute', left: namePix.l, top: namePix.t }}
          >{`${checkinFields.first_name} ${checkinFields.last_name}`}</h3>
          <h3 style={{ position: 'absolute', left: datePix.l, top: datePix.t }}>
            {moment().format('MM/DD/YYYY')}
          </h3>
        </div>
      </div>
    </>
  );
}
