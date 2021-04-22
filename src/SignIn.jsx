import React, { useCallback, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({ history }) => {
  const classes = useStyles();
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleLogin} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          />
          <button
            style={{
              width: "100%",
              borderRadius: "5px",
              backgroundColor: "#ef4444",
              height: "40px",
              color: "white",
              fontSize: "20px",
              marginTop: "20px",
            }}
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default withRouter(SignIn);
// <Button fullWidth variant="contained" color="primary"
// className={classes.submit}
// >Sign In
// </Button>

// <div>
//       <h1>Log in</h1>
//       <form onSubmit={handleLogin}>
//         <label>
//           Email
//           <input name="email" type="email" placeholder="Email" />
//         </label>
//         <label>
//           Password
//           <input name="password" type="password" placeholder="Password" />
//         </label>
//         <button type="submit">Log in</button>
//       </form>
//     </div>

// export default function SignIn() {
//   const classes = useStyles();
//   const click=()=>{
//       console.log('clicked');
//   }
//   return (

//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign in
//         </Typography>
//         <form className={classes.form} noValidate>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//           />

//           <Button onClick={click} fullWidth variant="contained" color="primary"
//             className={classes.submit}
//           >Sign In
//           </Button>

//         </form>
//       </div>
//       <Box mt={8}>
//         <Copyright />
//       </Box>
//     </Container>

//   );
// }
