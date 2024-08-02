import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "./common.css";

export const Home = () => {
  const navigate = useNavigate();
  const [isToggled, setIsToggled] = useState(false);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    let tempErrors = { username: "", password: "" };
    if (!userName) tempErrors.username = "Username is required.";
    if (!password) tempErrors.password = "Password is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleClick = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost:8090/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            password,
          }),
        });

        if (response.ok) {
          // Handle successful login, e.g., navigate to another page
          navigate("/login"); // Replace with your desired route
        } else {
          // Handle errors, e.g., show error message
          const errorData = await response.json();
          console.error("Login failed:", errorData);
          // You can set error messages here if needed
          setErrors((prev) => ({
            ...prev,
            password: "Invalid username or password",
          }));
        }
      } catch (error) {
        console.error("Error occurred during login:", error);
        // Handle network errors, etc.
      }
    }
  };

  return (
    <Grid container className="login-container" style={{ minHeight: "100vh" }}>
      <Grid item xs={12}>
        <img src="pow.jpg" alt="" className="photo" />
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="form-container"
      >
        <Grid item xs={12} sm={6} md={4} lg={3.5}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              style={{
                borderRadius: "50px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.1 }}
                >
                  <h1>
                    <span style={{ color: "#2db300" }}>Medi </span>{" "}
                    <span style={{ color: "#4287f5" }}>Pharma</span>
                  </h1>
                </motion.div>
                <p style={{ marginLeft: "10px" }}>Login To Continue:-</p>
                <form>
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <TextField
                      label="Username"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={userName}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, ""); // Remove spaces
                        setUsername(value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          e.preventDefault(); // Prevent space from being typed
                        }
                      }}
                      error={!!errors.username}
                      helperText={errors.username}
                      sx={{
                        borderRadius: "80px",
                        "& .MuiOutlinedInput-root": { borderRadius: "80px" },
                      }}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <TextField
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={!!errors.password}
                      helperText={errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleShowPasswordToggle}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        borderRadius: "80px",
                        "& .MuiOutlinedInput-root": { borderRadius: "80px" },
                      }}
                    />
                  </motion.div>
                  <div
                    onClick={handleToggle}
                    style={{
                      display: "flex",
                      margin: "20px 0",
                      cursor: "pointer",
                    }}
                  >
                    {isToggled ? (
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ToggleOnIcon
                          style={{ fontSize: 50, color: "#538eed" }}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ToggleOffIcon
                          style={{ fontSize: 50, color: "gray" }}
                        />
                      </motion.div>
                    )}
                    <span
                      style={{
                        position: "relative",
                        top: "-2px",
                        right: "-10px",
                      }}
                    >
                      <p style={{ cursor: "pointer" }}> Remember Me</p>
                    </span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      onClick={handleClick}
                      variant="contained"
                      // color="success"
                      fullWidth
                      style={{
                        borderRadius: "12px",
                        width: "80%",
                        position: "relative",
                        left: "38px",
                      }}
                    >
                      Login
                    </Button>
                  </motion.div>
                  <br />
                  <br />
                  <center>
                    _________<span style={{ color: "black" }}> Powered By</span>{" "}
                    <span style={{ color: "#2db300" }}>Medi</span>
                    <span style={{ color: "#4287f5" }}>Pharma</span>________
                  </center>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Grid>
  );
};
