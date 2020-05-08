const expect = require("chai").expect;
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

const authMiddleware = require("../middlewares/isAuth");

describe("Auth middleware", function () {
  const res = {
    status: function () {
      return this;
    },
    json: function () {},
  };
  it("should throw an error if no authorization header is present", function () {
    const req = {
      get: function (headerName) {
        return null;
      },
    };
    authMiddleware(req, res, () => {
      expect().to.have.property("statusCode", 401);
    });
  });

  it("should yield a user Id after decoding the token", function () {
    const req = {
      get: function (headerName) {
        return "Bearer djfkalsdjfaslfjdlas";
      },
    };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ id: "abc" });
    authMiddleware(req, res, () => {
      expect(req).to.have.property("id");
      expect(req).to.have.property("id", "abc");
      expect(jwt.verify.called).to.be.true;
      jwt.verify.restore();
    });
  });

  it('should throw an error if the token cannot be verified', function() {
    const req = {
      get: function(headerName) {
        return 'Bearer xyz';
      }
    };
    authMiddleware(req, res, () => {
      expect().to.have.property("statusCode", 401);
    });
  });
});
