const Rate = require("../models/rate");

exports.CreateProductRating = async (req, res) => {
  if (!req.body.productId) {
    res.status(404).json({ message: "Product is required" });
  }
  const { average, productId, userRate, user, reviews } = req.body;

  //   check if product exists
  Rate.findOne({ productId }).then(async (productStatus) => {
    // product doesn't exist
    if (productStatus === null) {
      const rate = new Rate({
        average: userRate,
        productId,
        userRate,
        user,
        review,
      });
      rate.save().then((productResponse) => {
        res
          .status(201)
          .json({ message: "Product has been rated", productResponse });
      });
    }

    // product already exists
    // update product rate
    await Rate.findOne({ productId }).then(((productResponse) => {
      let newAverage;
      const { average } = productResponse;
      if (average !== undefined) {
        newAverage = (userRate + average) / 2;
      } else newAverage = userRate;

      // update the product average
      Rate.findOneAndUpdate({ productId }, { average: newAverage, userRate, reviews, user }).then(
        (updatedData) => {
          res
            .status(201)
            .json({ message: "Product has been rated", updatedData });
        }
      );
    }));
  });
};

// get single product ratings
exports.fetchProductRatings = (req, res) => {
  Rate.findOne({ productId: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "No ratings available" });
      }
      return res.status(200).json({ message: "Product ratings", data });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "Something went wrong. Try again", error });
    });
};
