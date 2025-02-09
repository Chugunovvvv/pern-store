const Router = require("express");
const router = Router();
const brandController = require("../controllers/brandController");
router.post("/", brandController.create);
router.get("/", brandController.getAll);
router.delete("/:id", brandController.delete);

module.exports = router;
