const Cart = require("../models//cart");
const {
    verifyToken,
    verifyTokenAndAuth,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// GET ALL CARTS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
});

// CREATE CART
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET CART BY USER ID
router.get("/:userId", verifyTokenAndAuth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE CART
router.put("/:userId", verifyTokenAndAuth, async (req, res) => {
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { userId: req.params.userId },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE CART
router.delete("/:userId", verifyTokenAndAuth, async (req, res) => {
    try {
        await Cart.findOneAndDelete({ userId: req.params.userId });
        res.status(200).json("Cart has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
