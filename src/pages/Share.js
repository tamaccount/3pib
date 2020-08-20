import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import CheckIcon from '@material-ui/icons/Check';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Page from '../components/Page';
import Form from '../components/Form';
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

export default function Share({
  tab,
  setTab,
  emails,
  onNextClick,
  onBackClick,
  onChangeEmails
}) {
  const stepTwo = (
    <Step expanded={true}>
      <StepLabel icon={<PersonIcon />}>
        Recipients
      </StepLabel>
      <StepContent>
        {emails.map((email, i) => {
          return (
            <Form
              key={i}
              email={email}
              onChangeEmail={
                newEmail => onChangeEmails(
                  emails.map((_email, j) => {
                    if (i === j) {
                      return newEmail;
                    }
                    return _email;
                  })
                )
              }
            />
          );
        })}
        <ButtonGroup
          size="small"
          variant="outlined"
          style={{ marginBottom: 12 }}
        >
          <Button
            startIcon={<PersonAddIcon />}
            disabled={emails[emails.length - 1] === null}
            onClick={() => onChangeEmails([...emails, null])}
          >
            Add recipient
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
      </StepContent>
    </Step>
  )

  let user = 'Guest';
  try {
    user = window.context.logged_in_user;
  } catch (e) {

  }

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
        Add Recipients
      </Typography>
      <Stepper orientation="vertical" className={'MuiPaper-outlined'}>
        <Step expanded={true}>
          <StepLabel icon={<SendIcon />}>
            Sender
          </StepLabel>
          <StepContent>
            <Typography>{user}</Typography>
          </StepContent>
        </Step>
        {stepTwo}
        <Step expanded={true}>
          <StepLabel icon={<CheckIcon />}>
            Once an envelope has been routed to all recipients, and documents signed, each recipient will get a completed copy.
          </StepLabel>
        </Step>
      </Stepper>
      <div
        style={{
          display: 'flex',
          marginTop: 20,
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
          onClick={onNextClick}
          disabled={!emails.filter(p => !!p).length}
          style={{ marginLeft: 12 }}
        >
          Next
        </Button>
      </div>
    </Page>
  );
}
