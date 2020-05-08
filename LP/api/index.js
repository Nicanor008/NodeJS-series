const authRoutes = require("./users/auth_routes");
const userRoutes = require("./users");
const todoRoutes=require("./todo")
const analyticsRoutes=require("./analytics")

exports.startApp = (app) => {
    app.use("/auth", authRoutes);
    app.use("/users", userRoutes);
    app.use("/todo", todoRoutes);
    app.use("/analytics", analyticsRoutes);
}
