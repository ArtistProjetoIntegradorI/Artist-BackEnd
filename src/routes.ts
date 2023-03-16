import { Router } from "express";
import categoriesController from "./controllers/categories.controller";

const router = Router();

router.get("/", (_request, response) => {
  const { name, version } = require("../package.json");
  return response.json({
    name,
    version,
  });
});


router.post("/categories", categoriesController.create);
router.get("/categories", categoriesController.findAll);
router.get("/categories/:id", categoriesController.findById);
router.put("/categories/:id", categoriesController.update);


export { router };
