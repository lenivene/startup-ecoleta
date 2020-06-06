import { Router } from "express";
import multer from "multer";

// Config
import uploadConfig from "./config/upload";

// Controllers
import ItemsController from "./controllers/ItemsController";
import PointsController from "./controllers/PointsController";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/items", ItemsController.index);
routes.post("/points", upload.single("image"), PointsController.create);
routes.get("/points", PointsController.index);
routes.get("/points/:id", PointsController.show);

export default routes;
