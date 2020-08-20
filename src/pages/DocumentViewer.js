import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import moment from 'moment';
import Konva from 'konva';
import { Stage, Layer } from 'react-konva';
import html2canvas from 'html2canvas';
// import {WorkplaceContext} from "../Old";
//
// import {
//   Button,
//   Paper,
//   TextField,
//   CircularProgress,
//   InputLabel,
//   FormControl,
//   Select,
//   MenuItem,
//   Fade,
//   Dialog,
//   makeStyles,
// } from '@material-ui/core';
// import reducer, { initialState } from './reducer';
// import {
//   SET_MODE,
//   PROCESS_CHECKIN_IMAGE,
//   SET_FIELD,
//   COMPLETE_CHECKIN,
//   SET_CHECKIN_STEP,
// } from './constants';
// import { processCheckinImage, completeCheckin } from './WorkplaceApi';
//
// const WorkplaceContext = createContext();
//
// const useStyles = makeStyles(theme => ({
//   home: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     flexDirection: 'column',
//     fontSize: theme.typography.h5.fontSize,
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   modeSelect: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: theme.typography.h5.fontSize,
//   },
//   webcam: {},
//   webcamContainer: {
//     position: 'relative',
//     width: '1280px',
//     height: '720px',
//     margin: 'auto',
//     backgroundColor: 'rgba(0,0,0,0.7)',
//   },
//   webcamControls: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//     position: 'absolute',
//     backgroundColor: 'black',
//     width: '100%',
//     height: '100px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'white',
//     fontSize: theme.typography.h3.fontSize,
//   },
//   webcamFrame: {
//     position: 'absolute',
//     top: 'calc(50%)',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     height: '450px',
//     width: '720px',
//     border: '10px solid yellow',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkinFormContainer: {
//     height: 'calc(100% - 20px)',
//     padding: 20,
//     margin: 10,
//     display: 'flex',
//     flexDirection: 'column',
//     width: '80vw',
//   },
//   checkinField: { marginRight: 20, minWidth: 166 },
//   ibLogo: {
//     backgroundImage: 'url(/static/assets/images/logo-color.png)',
//     backgroundRepat: 'no-repeat',
//     backgroundSize: '60px 60px',
//     backgroundPosition: 'center center',
//     width: '60px',
//     height: '60px',
//     margin: '10px',
//   },
// }));
//
// function Workplace() {
//   const [state, dispatch] = useAsyncReducer(reducer, initialState, {
//     [PROCESS_CHECKIN_IMAGE]: processCheckinImage,
//     [COMPLETE_CHECKIN]: completeCheckin,
//   });
//
//   const { mode, checkinStep, checkinFields, loadStates, idImage } = state;
//
//   const setMode = toMode =>
//     dispatch({
//       type: SET_MODE,
//       mode: toMode,
//     });
//
//   const processCheckInImage = image =>
//     dispatch({
//       type: PROCESS_CHECKIN_IMAGE,
//       image,
//     });
//
//   const setField = (key, value) =>
//     dispatch({
//       type: SET_FIELD,
//       key,
//       value,
//     });
//
//   const onCompleteCheckIn = async () => {
//     const ndaContainer = document.querySelector('#nda-container');
//     ndaContainer.scrollTop = 0;
//     // dispatch({
//     //   type: SET_CHECKIN_STEP,
//     //   step: 2,
//     // });
//     const canvas = await html2canvas(ndaContainer);
//     dispatch({
//       type: COMPLETE_CHECKIN,
//       ndaImage: canvas.toDataURL(),
//       idImage,
//       fields: checkinFields,
//     });
//   };
//
//   const content = {
//     home: <WorkplaceHome />,
//     'check-in': <CheckIn />,
//   }[mode];
//
//   const workplaceContext = {
//     setField,
//     processCheckInImage,
//     setMode,
//     checkinStep,
//     checkinFields,
//     loadStates,
//     onCompleteCheckIn,
//   };
//   return (
//     <WorkplaceContext.Provider value={workplaceContext}>
//       <div
//         style={{
//           backgroundImage: `url(/static/assets/images/desktop-bg-1.svg)`,
//           backgroundSize: 'contain',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           height: '100vh',
//         }}
//       >
//         {content}
//       </div>
//     </WorkplaceContext.Provider>
//   );
// }

export default function DocViewer() {
  // const { checkinFields } = useContext(WorkplaceContext);
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
          height: '100%',
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
            src="https://dogfood.instabase.com/tamba/my-repo/fs/Instabase%20Drive/paper.pdf?content-disposition=raw"
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
          >
            {/*{`${checkinFields.first_name} ${checkinFields.last_name}`}*/}
          </h3>
          <h3 style={{ position: 'absolute', left: datePix.l, top: datePix.t }}>
            {moment().format('MM/DD/YYYY')}
          </h3>
        </div>
      </div>
    </>
  );
}
