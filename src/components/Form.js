import React from 'react';

import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// const options = [
//   { email: 'tamba@instabase.com' },
//   { email: 'mohit@instabase.com' },
//   { email: 'ashish@instabase.com' },
//   { email: 'karthik@instabase.com' },
// ]
const options = [
  'tamba@instabase.com',
  'mohit@instabase.com',
  'ashish@instabase.com',
  'karthik@instabase.com'
]

function UserSelect({ value, onChange }) {
  return (
    <Autocomplete
      id="demo"
      value={value}
      options={options}
      onChange={onChange}
      style={{ width: 270 }}
      // getOptionLabel={(option) => option.email}
      renderInput={(params) =>
        <TextField
          {...params}
          label="Email"
          InputLabelProps={{ shrink: true }}
          // inputProps={{ style: { padding: '6px 65px 6px 9px' }}}
          variant="outlined"
        />
      }
    />
  );
}

function Form({ email, onChangeEmail }) {
  return (
    <Card variant="outlined" style={{ marginBottom: 18 }}>
      <CardContent className="recipient-card-content">
        <Grid
          container={true}
          component="div"
          spacing={2}
          style={{
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <UserSelect
            value={email}
            onChange={(evt, value) => onChangeEmail(value)}
          />
          <ButtonGroup
            size="small"
            variant="outlined"
          >
            <Button
              className="recipient-button"
              startIcon={<CreateIcon />}
            >
              Needs to sign
            </Button>
            <IconButton
              size="small"
              variant="outlined"
              className="MuiButton-outlined"
              style={{
                padding: 3,
                minWidth: 20,
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
              }}
            >
              <ArrowDropDownIcon fontSize="inherit" />
            </IconButton>
          </ButtonGroup>
          <Button
            size="small"
            variant="outlined"
            className="recipient-button"
            endIcon={<ArrowDropDownIcon />}
          >
            More
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Form;
