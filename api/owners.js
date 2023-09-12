import express from "express";
import prisma from "./lib/index.js";
const router = express.Router();

// router.get('/' , (req, res) => {
//     res.send('Welcome owners');
// });

// get all owners
router.get("/", async (req, res) => {
  try {
    const owners = await prisma.owner.findMany();
    if (owners.length === 0) {
      return res.status(404).json({ error: "No owners found" });
    }
    res.json(owners);
  } catch (error) {
    res.status(500).json({ message: "Failed to get owners" });
  }
});

//get owner by id

router.get("/:id", async (req, res) => {
  try {
    const owners = await prisma.owner.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (owners) {
      res.status(200).json(owners );
    } else {
      res.status(404).json({ message: "Owner not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get owners" });
  }
});

//create a new owner
router.post("/", async (req, res) => {
  try {
    const owners = await prisma.owner.create({
      data: req.body,
    });
    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: "Failed to add owner" });
  }
});

// update owner
router.put("/:id", async (req, res) => {
  try {
    const owner = await prisma.owner.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    if (owner) {
      res.status(200).json(` Successfully      Owner ${req.params.id} was  updated`);
    } else {
      res.status(404).json({ message: "Owner not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update owner" });
  }
});

// delete owner

router.delete("/:id", async (req, res) => {
  try {
    const owners = await prisma.owner.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    if (owners) {
      res.status(200).json(`Successfully deleted owner ${req.params.id} `);
    } else {
      res.status(404).json({ message: " Owner not found" });
    }
  } catch (err) {
    res.status(404).json({ message: "Failed to delete owner" });
  }
});

export default router;
