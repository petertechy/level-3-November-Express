const ProductModel = require("../models/product.model");

const productDisplay = (req, res) => {
  res.render("product");
};

const addProduct = (req, res) => {
  let form = new ProductModel(req.body);
  form
    .save()
    .then(() => {
      console.log("Product saved");
      res.send({status: true, message: "Product Added Successfully"})
      // res.redirect("allproducts");
    })
    .catch((error) => {
      console.log(error);
    });
};

const fetchProduct = (req, res) => {
  ProductModel.find()
    .then((product) => {
      console.log(product);
      // res.send("Product gotten")
      res.render("allproducts", { allproducts: product });
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteProduct = (req, res) => {
  ProductModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/allproducts");
    })
    .catch((error) => {
      console.log(error);
    });
};

const editProduct = (req, res) => {
  ProductModel.findById(req.params.id)
    .then((product) => {
      if (!product) return res.send("Product not found");
      res.render("editProduct", { product });
    })
    .catch((error) => {
      console.log(error);
      res.send("Error loading product");
    });
};

const updateProduct = (req, res) => {
  const { product_name, product_price, product_quantity } = req.body;
  ProductModel.findByIdAndUpdate(
    req.params.id,
    { product_name, product_price, product_quantity },
    { new: true }
  )
    .then(() => {
      res.redirect("/allproducts");
    })
    .catch((error) => {
      console.log(error);
      res.send("Error updating product");
    });
};

module.exports = {
  addProduct,
  fetchProduct,
  deleteProduct,
  editProduct,
  updateProduct,
  productDisplay,
};
