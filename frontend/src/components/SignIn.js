import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import util from "../utils";
import cookies from "react-cookies";
import { Link as RLink, Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class SignIn extends Component {

  state = {
    email: "",
    Password: "",
    type: "",
    formError: false,
    auth: ""
  };

  getEmail = (e) => {
    let userEmail = e.target.value;
    if (userEmail.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)) {
      this.setState({
        email: userEmail
      });
    } else {
      this.setState({
        email: ""
      });
      console.log("Incorrect Email, must match Expression");
    }

    console.log(this.state.email);
  }

  gettype = e => {
    let type = e.target.value;
    this.setState({
      type: type
    });
    console.log(this.state.type);
  };

  getPassword = (e) => {
    let password = e.target.value;
    if (password) {
      this.setState({
        Password: password
      });
      console.log(this.state.Password);
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.Password,
      type: this.state.type
    };
    axios
      .post(`${util.BASE_URL}/login`, data)
      .then(res => {
        console.log(res);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("type", res.data.type);
        this.setState({ auth: "" })
      })
      .catch(err => this.setState({ auth: err.response.data.message }));
  };
  render() {
    let redirectvar = null;
    if (localStorage.getItem("type") == "talent" && localStorage.getItem("id")) {
      redirectvar = <Redirect to="/home" />
    }
    else if (localStorage.getItem("type") == "recruiter" && localStorage.getItem("id")) {
      redirectvar = <Redirect to="/recruiterhome" />
    }
    return (
      <Container component="main" maxWidth="xs">
        {this.state.auth && <p className="error">
          Invalid Login
                </p>}
        {redirectvar}
        <CssBaseline />
        <div className={useStyles.paper}>
          <Avatar className={useStyles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          {this.state.formError &&
            <p className="error">
              Fill all the input fields please.
                </p>
          }
          <form className={useStyles.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={this.getEmail}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.getPassword}
            />
            <div>
              <FormControl component="fieldset" className={useStyles.formControl}>
                <FormLabel component="legend">You Are</FormLabel>
                <RadioGroup aria-label="Type" name="type" value={this.state.type} onChange={this.gettype}>
                  <FormControlLabel value="talent" control={<Radio />} label="Talent" />
                  <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
                </RadioGroup>
              </FormControl>
            </div>


            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={useStyles.submit}
              onClick={this.handleSubmit}
            >
              Sign In
          </Button>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Grid container>
              <Grid item>
                <RLink to="/signup">
                  <Link href="">
                    <p>Don't have an account? Sign Up</p>
                  </Link>
                </RLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    );
  }
}
export default SignIn;
