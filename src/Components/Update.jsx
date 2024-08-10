import React, { useEffect, useState } from "react";
import "./update.css";
import { Grid, Card, CardContent, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Update = () => {
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

  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      axios
        .get(`http://localhost:8090/api/category/${categoryId}`)
        .then((res) => {
          console.log("Fetched data:", res.data);
          setCategoryName(res.data.categoryName || "");
          // You can also set the fileName here if you fetch it
        })
        .catch((err) => {
          console.error(
            "Error fetching category:",
            err.response ? err.response.data : err.message
          );
        });
    }
  }, [categoryId]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async () => {
    const category = {
      categoryName: categoryName,
    };

    const formData = new FormData();
    formData.append(
      "category",
      new Blob([JSON.stringify(category)], { type: "application/json" })
    );

    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.put(
        `http://localhost:8090/api/category/updateCategory/${categoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update response:", response.data);
      alert("Category updated successfully.");
      setCategoryName("");
      setFile(null);
      setFileName("");
      navigate("/cat");
    } catch (error) {
      console.error(
        "Error updating category:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to update category. Please check the console for details.");
    }
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Enter Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                  />
                </Button>
                {fileName && <span style={{ marginLeft: 10 }}>{fileName}</span>}
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
