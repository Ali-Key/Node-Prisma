import express from "express";
import prisma from "./lib/index.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();

    if (restaurants) {
      res.status(200).json(restaurants);
    } else {
      res.status(404).json({ message: "restaurants not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get restaurants" });
  }
});

// Get Single restaurant
router.get("/:id", async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ message: "restaurant not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get restaurant" });
  }
});

// Get restaurant by owner id
router.get("/owner/:id", async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.findMany({
      where: {
        ownerId: Number(req.params.id),
      },
    });

    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ message: "restaurant not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to get restaurant" });
  }
});

// Add restaurant
router.post("/", async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.create({
      data: req.body,
    });

    if (restaurant) {
      res.status(201).json(restaurant);
    } else {
      res.status(404).json({ message: "restaurant not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to add restaurant" });
  }
});

// Update restaurant
router.put("/:id", async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ message: "restaurant not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update restaurant" });
  }
});

// Delete restaurant
router.delete("/:id", async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    if (restaurant) {
      res.status(200).json({ message: "restaurant deleted" });
    } else {
      res.status(404).json({ message: "restaurant not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete restaurant" });
  }
});

export default router;
