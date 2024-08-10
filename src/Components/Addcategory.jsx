import React, { useState, useEffect } from "react";
import "./category.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WestIcon from "@mui/icons-material/West";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";

export const Addcategory = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/login");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const getData = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8090/api/category/getAllCategory"
      );
      console.log("Fetched Data:", result.data); // Debugging log
      setData(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async () => {
    const CategoryData = {
      categoryName: categoryName,
    };
    const formData = new FormData();
    formData.append("category", JSON.stringify(CategoryData));
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8090/api/category/create-category",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      if (response.status === 200) {
        alert("Category has been added successfully.");
        setCategoryName("");
        setFile(null);
        getData(); // Refresh data after adding a new category
        handleClose(); // Close the modal after submission
      }
    } catch (error) {
      console.error(
        "Error adding category:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDel = async (id) => {
    if (!id) {
      console.error("Invalid category ID:", id);
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8090/api/category/delete/${id}`
      );
      if (response.status === 200) {
        alert("Category deleted successfully.");
        getData(); // Refresh data after deletion
      }
    } catch (error) {
      console.error(
        "Error deleting category:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <div
        onClick={handleBack}
        style={{
          position: "relative",
          left: "70px",
          top: "40px",
          color: "#3333ff",
          cursor: "pointer",
        }}
      >
        <WestIcon style={{ fontSize: "30px" }} />
      </div>
      <div>
        <h1>Category page</h1>
      </div>
      <div style={{ position: "relative", left: "1200px", top: "-90px" }}>
        <Button color="success" variant="contained" onClick={handleOpen}>
          + Add Category
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3>Add Category:-</h3>
            <TextField
              variant="outlined"
              label="Enter category Name"
              fullWidth
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <h3>Add Category Image:-</h3>
            <input
              type="file"
              id="upload"
              name="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              color="success"
              onClick={() => document.getElementById("upload").click()}
              style={{
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Choose File
            </Button>
            {fileName && <span>{fileName}</span>} <br /> <br />
            <Button onClick={handleSubmit} variant="contained" fullWidth>
              Submit
            </Button>
          </Box>
        </Modal>
      </div>
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Category Name</th>
            <th>Category Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id || index}>
              <td>{index + 1}</td>
              <td>{item.categoryName}</td>
              <td>
                <img
                  src={item.categoryImage}
                  alt={item.categoryName}
                  width="50"
                />
              </td>
              <td>
                <Link to={`/edit/${item.categoryId}`}>
                  <EditIcon
                    style={{
                      color: "green",
                      marginRight: "30px",
                      cursor: "pointer",
                    }}
                  />
                </Link>

                <DeleteIcon
                  onClick={() => handleDel(item.categoryId)}
                  style={{ color: "red", cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
