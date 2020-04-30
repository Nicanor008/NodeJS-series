const express = require("express");
const articleControllers = require("./article_controller");
const isAuth = require("../../middlewares/isAuth");

const router = express.Router();

router
  .route("/")
  .post(isAuth, articleControllers.createArticle)
  .get(articleControllers.getAllArticles);

// draft
router.route("/draft").post(isAuth, articleControllers.createDraftArticle).get(isAuth, articleControllers.getAllDraft)

// publish draft
router.route("/draft/:id").patch(isAuth, articleControllers.publishDraft)

// update and delete single article
router
  .route("/:id")
  .patch(isAuth, articleControllers.updateUserArticle)
  .delete(isAuth, articleControllers.deleteSingleUserArticle);

//   fetch single and search article
router.route("/:title").get(articleControllers.getSingleArticle);
router.route("/search/:title").get(articleControllers.searchArticle);

// delete all user items
router.route("/user/articles/delete").delete(isAuth, articleControllers.deleteManyUserArticle)

// logged in user articles
router
  .route("/user/articles")
  .get(isAuth, articleControllers.fetchLoggedInUserArticles);

module.exports = router;
