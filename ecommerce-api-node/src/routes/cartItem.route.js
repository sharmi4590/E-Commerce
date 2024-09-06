const express=require("express") 
const router=express.Router();

const cartItemController=require("../controller/cartitem.controller.js");

const authenticate=require("../middleware/authenticate.js");
//.put("/", authenticate, cartItemController.a);
router.put("/:id", authenticate, cartItemController.updateCartItem);
 router.delete("/:id", authenticate, cartItemController.removeCartItem);

module.exports=router;