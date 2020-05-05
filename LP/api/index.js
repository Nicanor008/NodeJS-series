const authRoutes = require("./users/auth_routes");
const userRoutes = require("./users");

exports.startApp = (app) => {
    app.use("/auth", authRoutes);
    app.use("/users", userRoutes);
}
