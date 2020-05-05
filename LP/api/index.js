const authRoutes = require("./users/auth_routes");
const userRoutes = require("./users");
const todoRoutes=require("./todo")

exports.startApp = (app) => {
    app.use("/auth", authRoutes);
    app.use("/users", userRoutes);
    app.use("/todo", todoRoutes);
}
