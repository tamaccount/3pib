import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
// import { mapObject } from "underscore";
import MaterialTable from "material-table";

import Chip from "@material-ui/core/Chip";

import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

function LinearProgressWithLabel({ data }) {

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={2} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          0/1
        </Typography>
      </Box>
    </Box>
  );
}

const getColumns = () => [
  {
    width: 400,
    title: "Subject",
    field: "subject",
    render: rowData => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>{rowData.subject}</span>
        <span className="help-text">
        </span>
      </div>
    )
  },
  {
    title: "Status",
    field: "status",
    render: rowData => {
      return <LinearProgressWithLabel data={rowData} />;
    }
  },
  {
    width: 150,
    title: "Last Changed",
    field: "datetime",
    defaultSort: "desc",
    customSort: (a, b) => (a.lastChange || 0) - (b.lastChange || 0),
    render: rowData => (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>{moment(rowData.lastChange).format("l")} </span>
        <span className="help-text">
          {moment(rowData.lastChange).format("LTS")}
        </span>
      </div>
    )
    // render: rowData => rowData.lastUsed ?
    //   <span>{moment(rowData.lastUsed).format("ddd, MMM D, hh:mm A")} </span> :
    //   <span style={{ color: 'rgba(0,0,0,.38'}}>Yet to be used</span>
  },
  {
    title: "Folder",
    field: "folder",
    render: rowData => (
      <Chip
        size="small"
        label={rowData.folder}
        component="div"
        color="secondary"
      />
    )
  },
  {
    title: "Actions",
    field: "action",
    render: rowData =>
      <Button
        size="small"
        variant="outlined"
        // onClick={}
      >
        Sign
      </Button>
  },
];

// const getActions = (
//
// ) => [
//
// ];

const data = [
  {
    subject: 'Please Docusign: BOA_Bank_Statement_1.pdf',
    folder: 'Sent',
    status: 'Incomplete',
    lastChange: 1597773029044,
  },
  {
    subject: 'Please Docusign: Permission Slip (Sample Document).pdf',
    folder: 'Sent',
    status: 'Incomplete',
    lastChange: 1597774529044,
  }
]

function Listing() {
  return (
    <div id="listing-table">
      <MaterialTable
        columns={getColumns()}
        title="Waiting for Others"
        style={{ padding: '10px 20px 0 '}}
        data={data.map(item => Object.assign({}, item))}
        options={{
          pageSizeOptions: [],
          // actionsColumnIndex: -1,
        }}
        actions={[]}
      />
    </div>
  );
}

export default Listing;
