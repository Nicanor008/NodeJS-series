const authRoutes = require("./users/auth_routes");
const userRoutes = require("./users");

exports.startApp = (app) => {
    app.use("/v1/auth", authRoutes);
    app.use("/v1/users", userRoutes);
}
