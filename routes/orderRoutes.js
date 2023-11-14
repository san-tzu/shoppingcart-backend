const Order = require("../models/order");
const {
    verifyToken,
    verifyTokenAndAuth,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

// GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
        new Date().setMonth(lastMonth.getMonth() - 1)
    );

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json(error);
    }
});

// CREATE ORDER
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ORDER BY USER ID
router.get("/:userId", verifyTokenAndAuth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
});

// UPDATE ORDER
router.put("/:userId", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { userId: req.params.userId },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE Order
router.delete("/:userId", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findOneAndDelete({ userId: req.params.userId });
        res.status(200).json("Order has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
