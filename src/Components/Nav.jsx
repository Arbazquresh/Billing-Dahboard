import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Button,
  Modal,
  Typography,
  TextField,
} from "@mui/material";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const Nav = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [data, setData] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(""); //2
  const [selectedFile, setSelectedFile] = useState(null); //5
  const [fileName, setFileName] = useState(""); //4
  const [productName, setProductName] = useState(""); //1
  const [price, setPrice] = useState(""); //3

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSet = () => {
    navigate("/setting");
  };

  const handleCat = () => {
    navigate("/cat");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const getData = async () => {
    const result = await axios.get(
      "http://localhost:8090/api/category/getAllCategory"
    );
    setData(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : "");
  };

  const handleAddProduct = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const product = {
      productName: productName,// productName,price will same of getter of usestate
      productPrice: price,
    };

    const formData = new FormData();
    formData.append("product", JSON.stringify(product)); // product & file name should be same in backend and database
    formData.append("file", selectedFile); // Include the selected file

    try {
      const response = await axios.post(
        `http://localhost:8090/api/product/add-product/${selectedCategory}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      alert("Product is added successfully!");

      // Reset form values to empty
      setProductName("");
      setSelectedCategory("");
      setPrice("");
      setFileName("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product. Please try again.");
    }
  };
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
        <TextField
          label="Product Name"
          fullWidth
          sx={{ mb: 2 }}
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="select-label">Select Category</InputLabel>

          <Select
            labelId="select-label"
            label="Select Category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {data.map((item) => (
              <MenuItem key={item.id} value={item.categoryName}>
                {item.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Price"
          type="number"
          fullWidth
          sx={{ mb: 2 }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            ADD PRODUCT
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>
          {fileName && <p>Selected File: {fileName}</p>}
        </div>
        <br /> <br />
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          onClick={handleAddProduct}
        >
          Addd Product
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );

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
            onClick={handleCat}
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
    </Grid>
  );
};
