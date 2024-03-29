import { useState, useEffect } from "react";
import "./LoginPage.scss";
import Button from "@mui/material/Button";
import { Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Google from "../../assets/google.jpeg";
import Apple from "../../assets/apple.png";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const LoginPage = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      navigate("/dashboard");
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="diagonal-background">
      <div className="color1">
        <Typography variant="h2" style={{ textAlign: "center", height: "88px", marginTop: "300px", fontWeight: "900px", color: "white" }}>Base</Typography>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div style={{ paddingBottom: '20px' }}>
            <Typography variant='h4'>Sign In</Typography>
            <Typography>Sign in to your account</Typography>
          </div>
          <div className="buttons">
            <Button variant="contained" type="submit" className="buttonGoogle">
              <img src={Google} width='20px' height='25px' style={{ padding: '5px 0px 5px 0px' }} alt="Google Logo"></img> Sign in with Google
            </Button>
            <Button variant="contained" type="submit" className="buttonApple">
              <img src={Apple} width='20px' height='25px' style={{ padding: '5px' }} alt="Apple Logo"></img> Sign in with Apple
            </Button>
          </div>
          <div className="ui form">
            <div className="field">
              <Typography style={{ paddingTop: '20px' }}>Email</Typography>
              <TextField
                required
                id="filled-required"
                label="Required"
                defaultValue=""
                variant="filled"
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
                style={{ width: '356px' }}
              />
            </div>
            <p style={{ color: 'red', fontSize: '14px' }}>{formErrors.email}</p>
            <div className="field">
              <Typography>Password</Typography>
              <TextField
                required
                id="filled-required"
                label="Required"
                defaultValue=""
                variant="filled"
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                style={{ width: '356px' }}
              />
            </div>
            <p style={{ color: 'red', fontSize: '14px' }}>{formErrors.password}</p>
            <Typography style={{ color: 'blue', paddingTop: '20px' }}>Forget Password ?</Typography>
            <Button variant="contained" type="submit" className="signInButton">Sign In</Button>
            <Typography style={{ paddingTop: '40px', textAlign: 'center' }}>Don't have an account? <span style={{ color: 'blue' }}>Register here</span></Typography>
          </div>
        </form>
              {/* Footer with social media icons */}
      <div className="footer">
        <a href="#" className="social-icon"><FacebookIcon /></a>
        <a href="#" className="social-icon"><XIcon /></a>
        <a href="#" className="social-icon"><InstagramIcon /></a>
        <a href="#" className="social-icon"><LinkedInIcon /></a>
      </div>
      </div>
    </div>
  );
}

export default LoginPage;