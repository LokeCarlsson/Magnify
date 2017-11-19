const controller = require("./controller");
const Router = require("express").Router;
const router = new Router();

router
  .route("/")
  //.get((...args) => controller.find(...args))
  .post((...args) => controller.createAccount(...args));

//router.route('/:id')
//.put((...args) => controller.update(...args))
//.get((...args) => controller.findById(...args))
//.delete((...args) => controller.remove(...args));

router.route("/login").post((...args) => controller.login(...args));
module.exports = router;