const Notification = require("../../models/notification/Notification");
const express = require("express");
const router = express.Router();

// http://localhost:3000/api/notifications/
router.post("/", async (req, res) => {
  const { accountId, name, color } = req.body;

  let notification = new Notification({ accountId, name, color });
  await notification.save();
  return res.send({ message: "success" });
});

//http://localhost:3000/api/notifications/1
router.get("/:accountId", (req, res) => {
  const accountId = req.params.accountId;
  Notification.find({ accountId })
    .then(doc => {
      console.log("Notifications from the database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "was not found data for this ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


//http://localhost:3000/api/notifications/1/red
router.delete("/:accountId/:color", (req, res) => {
  const accountId = req.params.accountId;
  const color = req.params.color;
  Notification.deleteMany({ accountId,color })
  .then(result => {
    if (result.n> 0) {
      res.status(200).json(result);
  }
  })
  .catch(err => {
    res.status().json({
      error: err
    });
  });

});

module.exports = router;
