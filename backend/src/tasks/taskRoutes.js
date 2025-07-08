import express from "express";

const router = express.Router();

// Example: Get all tasks
router.get("/", async (req, res) => {
  res.status(200).json({
    message:"success",
    data:{
      task:"all task"
    }
  })
});

// TODO: Add other CRUD endpoints (create, update, delete, get by id)

export default router;
