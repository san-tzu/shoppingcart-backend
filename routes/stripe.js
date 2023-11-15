const router = require("express").Router();

const stripe = require("stripe")(
    "sk_test_51OCNFGSAvdFBrS6DwFQ52y0V52fJFwVg0RsOC0Ced7yPa5YsKaMKXVoG51IBTO4b0RKdHAI7BLX6TRAr5I9uVEUp00ql3VpChF"
);

router.post("/payment", async (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        },
        (stripeError, stripeRes) => {
            if (stripeError) {
                res.status(500).json(stripeError);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );
});

module.exports = router;
