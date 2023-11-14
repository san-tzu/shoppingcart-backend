const router = require("express").Router();


router.get("/", (req, res) => {
    res.send("This is user route");
})

router.post("/", (req, res) => {
    console.log(req.body);
    res.send("This is user post route");
})

module.exports = router