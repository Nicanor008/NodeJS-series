const slugify = require("slugify");
const statusCode = require("http-status");

const Article = require("./article_model");
const User = require("../users/users_models");

// create draft article
exports.createDraftArticle = (req, res) => {
  const { title, body, coverImage, tags, author } = req.body;
  const slug = slugify(title);

  //   user must be a author
  User.findById({ _id: author }).then((userExist) => {
    if (!userExist) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "User Does not exist",
      });
    }
    if (userExist.role !== "author") {
      return res.status(statusCode.FORBIDDEN).json({
        message: "You not an author, kindly change your roles to author",
      });
    }
    const article = new Article({
      title,
      slug,
      body,
      coverImage,
      tags,
      author,
      draft: true,
    });
    article
      .save()
      .then((response) => {
        if (!response) {
          return res
            .status(statusCode.NOT_FOUND)
            .json({ message: "No data returned" });
        }
        return res
          .status(statusCode.OK)
          .json({ message: "Article has been saved as draft", data: response });
      })
      .catch((error) => {
        return res
          .status(statusCode.SERVICE_UNAVAILABLE)
          .json({ message: "Something went happen. Try again", error });
      });
  });
};

// publish draft
exports.publishDraft = (req, res) => {
  const draftArticleId = req.params.id;
  Article.findByIdAndUpdate({ _id: draftArticleId }, { draft: false })
    .then((data) => {
      return res
        .status(statusCode.OK)
        .json({ message: "Article has been published", data });
    })
    .catch((error) => {
      return res
        .status(statusCode.SERVICE_UNAVAILABLE)
        .json({ message: "Something went happen. Try again", error });
    });
};

// create and publish article
exports.createArticle = (req, res) => {
  const { title, body, coverImage, tags, author } = req.body;
  const slug = slugify(title);

  //   user must be a author
  User.findById({ _id: author }).then((userExist) => {
    if (!userExist) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "User Does not exist",
      });
    }
    if (userExist.role !== "author") {
      return res.status(statusCode.FORBIDDEN).json({
        message: "You not an author, kindly change your roles to author",
      });
    }
    const article = new Article({
      title,
      slug,
      body,
      coverImage,
      tags,
      author,
      draft: false,
    });
    article
      .save()
      .then((response) => {
        if (!response) {
          return res
            .status(statusCode.NOT_FOUND)
            .json({ message: "No data returned" });
        }
        return res
          .status(statusCode.OK)
          .json({ message: "Article has been created", data: response });
      })
      .catch((error) => {
        return res
          .status(statusCode.SERVICE_UNAVAILABLE)
          .json({ message: "Something went happen. Try again", error });
      });
  });
};

// get all draft articles
exports.getAllDraft =(req, res) => {
    Article.aggregate([
        {
            $match: { draft: true }
        },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $unwind: "$author",
        },
      ])
        .then((data) => {
          if (data.length === 0) {
            return res
              .status(statusCode.NOT_FOUND)
              .json({ message: "No Article available" });
          }
          res
            .status(statusCode.OK)
            .json({ message: "Articles fetched successfully", data });
        })
        .catch((error) => {
          return res
            .status(statusCode.SERVICE_UNAVAILABLE)
            .json({ message: "Something went happen. Try again", error });
        });
}

// fetch all articles
// sort latest
exports.getAllArticles = (req, res) => {
  Article.aggregate([
    {
        $match: { draft: false }
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $unwind: "$author",
    },
  ])
    .then((data) => {
      if (data.length === 0) {
        return res
          .status(statusCode.NOT_FOUND)
          .json({ message: "No Article available" });
      }
      res
        .status(statusCode.OK)
        .json({ message: "Articles fetched successfully", data });
    })
    .catch((error) => {
      return res
        .status(statusCode.SERVICE_UNAVAILABLE)
        .json({ message: "Something went happen. Try again", error });
    });
};

// get a single article
exports.getSingleArticle = (req, res) => {
  const title = req.params.title.toLowerCase();
  Article.aggregate([
    { $match: { title } },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    { $unwind: "$author" },
  ])
    .then((article) => {
      if (article.length === 0) {
        return res
          .status(statusCode.NOT_FOUND)
          .json({ message: "Article not found" });
      }
      return res
        .status(statusCode.OK)
        .json({ message: "Article fetched", data: article });
    })
    .catch((error) => {
      return res
        .status(statusCode.SERVICE_UNAVAILABLE)
        .json({ message: "Something went happen. Try again", error });
    });
};

// search for articles
exports.searchArticle = (req, res) => {
  const title = req.params.title.toLowerCase();
  Article.aggregate([
    { $match: { title: { $regex: title } } },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    { $unwind: "$author" },
  ])
    .then((article) => {
      if (article.length === 0) {
        return res
          .status(statusCode.NOT_FOUND)
          .json({ message: "Article not found" });
      }
      return res.status(statusCode.OK).json({
        message: `${article.length} ${
          article.length > 1 ? "Articles" : "Article"
        } found`,
        data: article,
      });
    })
    .catch((error) => {
      return res
        .status(statusCode.SERVICE_UNAVAILABLE)
        .json({ message: "Something went happen. Try again", error });
    });
};

// fetch single user articles
// must be articles for the loggged in user
exports.fetchLoggedInUserArticles = (req, res) => {
  const loggedInUserId = req.id;
  Article.find({ author: loggedInUserId })
    .then((userArticles) => {
      if (userArticles.length === 0) {
        return res
          .status(statusCode.NOT_FOUND)
          .json({ message: "You haven't wrtitten any articles yet" });
      }
      return res.status(statusCode.OK).json({
        message: `You have ${userArticles.length} published Articles`,
        data: userArticles,
      });
    })
    .catch((error) => {
      return res
        .status(statusCode.SERVICE_UNAVAILABLE)
        .json({ message: "Something went happen. Try again", error });
    });
};

// update user articles
exports.updateUserArticle = (req, res) => {
  const loggedInUserId = req.id;

  //   ensure it's the users article(author)
  Article.find({ author: loggedInUserId })
    .then((userArticles) => {
      if (userArticles.length === 0) {
        return res
          .status(statusCode.NOT_FOUND)
          .json({ message: "You haven't wrtitten any articles yet" });
      }
      Article.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
          Article.findById({ _id: req.params.id }).then((fetchedNewArticle) => {
            return res.status(statusCode.OK).json({
              message: "Article has been updated",
              data: fetchedNewArticle,
            });
          });
        })
        .catch((error) => {
          return res.status(statusCode.SERVICE_UNAVAILABLE).json({
            message:
              "Something went happen, most likey to the article. Ensure the article Exists",
            error,
          });
        });
    })
    .catch((error) => {
      return res
        .status(statusCode.FORBIDDEN)
        .json({ message: "You are not the author", error });
    });
};

// delete user single article
exports.deleteSingleUserArticle = (req, res) => {
  Article.findByIdAndDelete({ _id: req.params.id })
    .then((deletedArticle) => {
      if (!deletedArticle) {
        return res
          .status(statusCode.NOT_FOUND)
          .json({ message: "This article doesn't exist." });
      }
      return res
        .status(statusCode.OK)
        .json({ message: "Item deleted successfully" });
    })
    .catch((error) => {
      return res
        .status(statusCode.FORBIDDEN)
        .json({ message: "Something went Wrong. Try again", error });
    });
};

// delete many user articles
exports.deleteManyUserArticle = (req, res) => {
  const loggedInUserId = req.id;
  Article.find({ author: loggedInUserId })
    .then((ar) => {
      Article.deleteMany({ author: loggedInUserId })
        .then((deletedArticle) => {
          if (deletedArticle.deletedCount === 0) {
            return res
              .status(statusCode.NOT_FOUND)
              .json({ message: "You Don't have any articles" });
          }
          return res
            .status(statusCode.OK)
            .json({ message: "All Articles deleted successfully" });
        })
        .catch((error) => {
          return res
            .status(statusCode.SERVICE_UNAVAILABLE)
            .json({ message: "Something went Wrong. Try again", error });
        });
    })
    .catch((error) => {
      return res
        .status(statusCode.FORBIDDEN)
        .json({ message: "You not the author, sorry", error });
    });
};
