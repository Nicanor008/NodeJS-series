exports.DBSetup = () => {
    mongoose
      .connect("mongodb://127.0.0.1/LP-test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => {
        const user = new User({
          email: "test@test.com",
          password: "tester",
          name: "Test",
          role: "author"
        });
        return user.save();
      })
      .then(() => {
        done();
      });
}