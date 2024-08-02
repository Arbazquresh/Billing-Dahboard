import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Button,
  Modal,
  Typography,
  TextField,
  CardContent,
  Card,
} from "@mui/material";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

// Add Product Modal Component
const AddProductModal = ({ open, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="add-product-modal"
    aria-describedby="add-product-description"
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Box
      sx={{
        width: "80%",
        maxWidth: 600,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        backdropFilter: "blur(10px)",
      }}
    >
      <Typography variant="h6" component="h2">
        Add New Product
      </Typography>
      <TextField label="Product Name" fullWidth sx={{ mb: 2 }} />
      <FormControl fullWidth>
        <InputLabel id="select-label">Select Medicine</InputLabel>
        <Select labelId="select-label" label="Select Medicine" defaultValue="">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Paracetamol</MenuItem>
          <MenuItem value={20}>Dolo 650</MenuItem>
          <MenuItem value={30}>Crosin</MenuItem>
        </Select>
      </FormControl>
      <br /> <br />
      <TextField label="Price" type="number" fullWidth sx={{ mb: 2 }} />
      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" sx={{ mr: 2 }}>
        Add Product
      </Button>
      <Button variant="outlined" color="secondary" onClick={onClose}>
        Cancel
      </Button>
    </Box>
  </Modal>
);

// Add Category Modal Component
const AddCategoryModal = ({ open, onClose }) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="add-category-modal"
    aria-describedby="add-category-description"
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Box
      sx={{
        width: "80%",
        maxWidth: 600,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        backdropFilter: "blur(10px)",
      }}
    >
      <Typography variant="h6" component="h2">
        Add New Category
      </Typography>
      <TextField label="Category Name" fullWidth sx={{ mb: 2 }} />
      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" sx={{ mr: 2 }}>
        Add Category
      </Button>
      <Button variant="outlined" color="secondary" onClick={onClose}>
        Cancel
      </Button>
    </Box>
  </Modal>
);

export const Nav = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openAddCategory, setOpenAddCategory] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSet = () => {
    navigate("/setting");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={0.5}></Grid>
      <Grid item xs={4.5}>
        <h2
          style={{
            marginTop: "10px",
            fontFamily: "cursive",
          }}
        >
          <span style={{ color: "#2db300" }}>Medi</span>{" "}
          <span style={{ color: "#4287f5" }}>Pharma</span>
        </h2>
      </Grid>
      <Grid item xs={7}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="POS" sx={{ color: "green" }} />
          <Tab
            label="+Add Products"
            sx={{ color: "green" }}
            onClick={() => setOpenAddProduct(true)}
          />
          <Tab
            label="+Add Category"
            sx={{ color: "green" }}
            onClick={() => setOpenAddCategory(true)}
          />
          <Tab label="Settings" sx={{ color: "green" }} onClick={handleSet} />
          <Tab label="Reports" sx={{ color: "green" }} />
          <Button
            sx={{ borderRadius: "50px", height: "40px" }}
            onClick={handleLogout}
            variant="contained"
            color="error"
          >
            Logout
          </Button>
        </Tabs>
      </Grid>

      {/* Modals */}
      <AddProductModal
        open={openAddProduct}
        onClose={() => setOpenAddProduct(false)}
      />
      <AddCategoryModal
        open={openAddCategory}
        onClose={() => setOpenAddCategory(false)}
      />
    </Grid>
  );
};
