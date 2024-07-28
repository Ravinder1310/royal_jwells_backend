import express from "express";
import { LoginMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController,productCategoryController, getProductController,getSingleProductController, productListController, productPhotoController, searchProductController, similarProductController, updateProductController,productCountController } from "../controllers/productControllers.js";
import multer from "multer";


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ 
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
        parameterLimit: 10000,
        fields: [
          { name: "photo", maxCount: 1 }
        ]
      }
    });


// routes
router.post(
  "/create-product",
  upload.fields([
    { name: "photo", maxCount: 1 }
  ]),
  LoginMiddleware,
  isAdmin,
  createProductController 
);

// update product
router.put(
    "/update-product/:pid",
    LoginMiddleware,
    isAdmin,
    updateProductController
  );

// get products
router.get('/get-product', getProductController)

// single product
router.get('/get-product/:slug', getSingleProductController);

// get photo
router.get('/product-photo/:pid',productPhotoController)

// delete product
router.delete('/delete-product/:pid',deleteProductController);

// product count
router.get('/product-count', productCountController)

// products per page
router.get('/product-list/:page', productListController)

// search product
router.get('/search/:keyword', searchProductController);

// similar peoducts
router.get('/similar-product/:pid/:cid', similarProductController);

// product according to single category
router.get('/product-category/:slug', productCategoryController);


export default router