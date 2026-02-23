const mongoose = require("mongoose");

const connectionofDb = async () => {
  try {
    const mongoUri = process.env.MONGO_DB;
    if (!mongoUri) {
      throw new Error("MONGO_DB is not defined in .env");
    }
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectionofDb;