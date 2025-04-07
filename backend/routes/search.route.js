import express from "express";
import {
	getSearchHistory,
	removeItemFromSearchHistory,
	searchMovie,
	searchPerson,
	searchTv,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/:type/:query", (req, res) => {
  const { type } = req.params;
  switch(type) {
    case 'movie':
      return searchMovie(req, res);
    case 'tv':
      return searchTv(req, res);
    case 'person':
      return searchPerson(req, res);
    default:
      return res.status(400).json({ 
        success: false, 
        message: "Invalid search type" 
      });
  }
});

router.get("/history", getSearchHistory);

router.delete("/history/:id", removeItemFromSearchHistory);

export default router;