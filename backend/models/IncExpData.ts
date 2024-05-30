import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  txnId: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  userid: {
    type: String,
    required: true,
  },
  income: {
    type: Number,
    trim: true,
    required: true
  },
  expense: {
    type: Number,
    trim: true,
    required: true,
  },
  title: {
    type: String
  },
  date: {
    type: String,
    trim: true
  }
});

export default mongoose.model("IncExp", UserSchema);
