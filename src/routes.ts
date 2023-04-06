import { Router } from "express";
import {ensureAuthentication} from "./middlewares/authentication.handler";
import categoriesController from "./controllers/categories.controller";
import userController from "./controllers/user.controller";
import addressController from "./controllers/address.controller";
import ratingController from "./controllers/rating.controller";
import socialController from "./controllers/social.controller";

const router = Router();

router.get("/", (_request, response) => {
  const { name, version } = require("../package.json");
  return response.json({
    name,
    version,
  });
});

//Category
router.post("/categories", categoriesController.create);
router.get("/categories", categoriesController.findAll);
router.get("/categories/:id", categoriesController.findById);
router.put("/categories/:id", categoriesController.update);
router.delete("/categories/:id", categoriesController.delete);

//Login
router.get("/login", userController.login);

//User
router.post("/user", userController.create);
router.get("/user", ensureAuthentication, userController.findAll);
router.get("/user/:id", ensureAuthentication, userController.findById);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

//Address
router.post("/address", addressController.create);
router.get("/address/:id", addressController.findById);
router.put("/address/:id", addressController.update);
router.delete("/address/:id", addressController.delete);

//Rating
router.post("/rating", ratingController.create); 

//Social
router.post("/social", socialController.create);
router.get("/social", socialController.findAll);
router.get("/social/:id", socialController.findById);
router.put("/social/:id", socialController.update);
router.delete("/social/:id", socialController.delete);

export { router };
