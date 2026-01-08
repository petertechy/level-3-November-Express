const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const endpoint = require("../utils/endpoint");
const { addProduct, fetchProduct, deleteProduct, editProduct, updateProduct, productDisplay } = require("../controllers/product.controller");
const { addUser, authenticateUser, getDashboard, uploadFile } = require("../controllers/user.controller");

const customers = [];

router.get("/", (request, response) => {
  // response.send("Hello World")
  console.log("Backend is working");
  response.json(endpoint);
});

router.get("/about", (req, res) => {
  console.log("This is my About page");
  res.send(`<h1>Welcome to About</h1>`);
});

router.get("/welcome", (req, res) => {
  console.log("Welcome Page displayed");
  console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
  // console.log("C:\Users\peter\Desktop\All Coding Classes\Level 3 Class\backend\index.html")
});

router.get("/services", (req, res) => {
  res.sendFile(__dirname + "/services.html");
});

router.get("/home", (req, res) => {
  // const user = {firstName:"Elizabeth", lastName: "Durojaye", age: 20}
  res.render("index", { endpoint });
});

router.get("/sign-up", (req, res) => {
  res.render("signup");
});

// router.post("/register",(req,res)=>{
//     console.log(req.body)
//     console.log("This user has been registered")
//     res.send("User registered")
//     customers.push(req.body)
//     console.log(customers)
//     res.redirect("/dashboard")
// })

router.post("/register", addUser);
router.post("/signin", authenticateUser)
router.get("/user-dashboard", getDashboard )

router.get("/dashboard", (req, res) => {
  res.render("dashboard", { customers });
});

// router.post("/delete/:index", (req, res) => {
//   console.log(req.params.index);
//   let index = req.params.index;
//   if (index >= 0 && index < customers.length) {
//     customers.splice(index, 1);
//   }
//   res.redirect("/dashboard");
// });

// router.post("/update/:index", (req, res) => {
//   const index = req.params.index;
//   const { firstname, lastname, email } = req.body;
//   customers[index] = { firstname, lastname, email };
//   res.redirect("/dashboard");
// });

router.get("/add-product", productDisplay);

router.post("/product", addProduct);

router.get("/allproducts", fetchProduct);

// Delete product by ID
router.post("/delete/:id", deleteProduct);

// Show edit form for a product
router.get("/edit/:id", editProduct);

// Handle product update
router.post("/edit/:id", updateProduct);

router.post("/upload", uploadFile)

module.exports = router;
