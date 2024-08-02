import React, { useEffect, useState } from "react";
import {
  CardContent,
  Card,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { Search, Add, Remove, Delete } from "@mui/icons-material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";

// Define theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff5722",
    },
    error: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h3: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
});

// Styled component for animation
const AnimatedCard = styled(Card)({
  height: "200px",
  backgroundColor: "#f2f2f2",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
  },
});

export const Fetching = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Snackbar states
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Fetch data from the API
  const getData = async () => {
    try {
      const result = await axios.get("https://fakestoreapi.com/products");
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle change in search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle change in category
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Handle product click
  const handleProductClick = (item) => {
    setSelectedItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Handle quantity change
  const handleQuantityChange = (itemId, change) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(item.quantity + change, 1) }
          : item
      )
    );
  };

  // Handle delete
  const handleDelete = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  // Handle place order

  const handlePlaceOrder = () => {
    setSnackbarMessage("Order placed successfully!");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
    setSelectedItems([]);
  };

  // Handle cancel order
  const handleCancelOrder = () => {
    setSnackbarMessage("Order canceled.");
    setSnackbarSeverity("error");
    setOpenSnackbar(true);
    setSelectedItems([]);
  };

  // Get unique categories
  const categories = ["All", ...new Set(data.map((item) => item.category))];

  // Filter data based on search query and selected category
  const filteredData = data.filter(
    (item) =>
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All" || item.category === selectedCategory)
  );

  // Calculate totals
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = total * 0.1; // 10% tax
  const discount = total * 0.05; // 5% discount
  const grossTotal = total + tax - discount;

  // Close Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3} sx={{ padding: "20px" }}>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Search by category"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  marginBottom: "20px",
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                label="Category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                sx={{
                  marginBottom: "20px",
                  width: "100%",
                  "& .MuiSelect-root": {
                    borderRadius: "20px",
                  },
                  "& fieldset": {
                    borderRadius: "20px", // Ensures the outline of the Select component is also rounded
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <Box
            sx={{
              maxHeight: "400px",
              overflowY: "auto",
              paddingRight: "10px", // To prevent scroll bar overlap
            }}
          >
            <Grid container spacing={2}>
              {filteredData.map((item) => (
                <Grid item xs={3} key={item.id}>
                  <AnimatedCard onClick={() => handleProductClick(item)}>
                    <CardContent>
                      <img
                        src={item.image}
                        alt={item.title}
                        height={100}
                        width={100}
                        style={{ marginBottom: "10px" }}
                      />
                      <Typography variant="h7" gutterBottom>
                        {item.category.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ position: "relative", top: "-4px" }}
                      >
                        ${item.price}/-
                      </Typography>
                    </CardContent>
                  </AnimatedCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Selected Items Display Grid */}
        <Grid item xs={6}>
          <Typography variant="h4" gutterBottom>
            Billing....
          </Typography>
          <Box
            sx={{
              maxHeight: "300px",
              overflowY: "auto",
              paddingRight: "10px", // To prevent scroll bar overlap
            }}
          >
            {selectedItems.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          backgroundColor: "primary.main",
                          color: "#fff",
                        }}
                      >
                        Product Name
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "primary.main",
                          color: "#fff",
                        }}
                      >
                        Price
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "primary.main",
                          color: "#fff",
                        }}
                      >
                        Quantity
                      </TableCell>
                      <TableCell
                        sx={{
                          backgroundColor: "primary.main",
                          color: "#fff",
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedItems.map((item) => (
                      <TableRow
                        key={item.id}
                        sx={{
                          transition: "background-color 0.3s",
                          "&:hover": { backgroundColor: "#f5f5f5" },
                        }}
                      >
                        <TableCell>{item.title.slice(0, 20)}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            <Remove />
                          </IconButton>
                          <span>{item.quantity}</span>
                          <IconButton
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <Add />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDelete(item.id)}>
                            <Delete style={{ color: "#ff1a1a" }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="body1" color="textSecondary">
                No products selected.
              </Typography>
            )}
          </Box>
          {/* Totals Card */}
          <Card
            sx={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Typography variant="subtitle1">
                  Total: ${total.toFixed(2)}
                </Typography>
                <Typography variant="subtitle1">
                  Tax (10%): ${tax.toFixed(2)}
                </Typography>
                <Typography variant="subtitle1">
                  Discount (5%): -${discount.toFixed(2)}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  Gross Total: ₹{grossTotal.toFixed(2)}/-
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Box display="flex" justifyContent="center" marginTop="10px">
            <Button
              onClick={handlePlaceOrder}
              variant="contained"
              color="primary"
              sx={{ margin: "5px" }}
            >
              Place Order
            </Button>
            <Button
              onClick={handleCancelOrder}
              variant="contained"
              color="error"
              sx={{ margin: "5px" }}
            >
              Cancel Order
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar for alerts */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon />
          </IconButton>
        }
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};
