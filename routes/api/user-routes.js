const router = require("express").Router();
const res = require("express/lib/response");
const { User } = require("../../models");

// GET /api/users
router.get("/", (req, res) => {
  // Access our User model and run .findALL() method
  User.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/1
router.get("/:id", (req, res) => {
  // access user model and find 1 of the users based on id
  // passing in the where argument
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post("/", (req, res) => {
  // expects{username: ----, email: ----, password: ----}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/users/1 -- update existing data
router.put("/:id", (req, res) => {
  // expects {username: ---, email: ---, password: ---}
  // if req.body has exact key/value pairs to match the model, you can just use ' req.body instead
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ mesage: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.lor(err);
      res.status(500).json(err);
    });
});

module.exports = router;
