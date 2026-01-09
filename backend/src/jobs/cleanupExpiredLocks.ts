import Product from "../models/product";

export const cleanupExpiredLocks = async () => {
  const now = new Date();

  const result = await Product.updateMany(
    {
      lockExpiresAt: { $lte: now },
      reserved: { $gt: 0 },
    },
    {
      $inc: { stock: 1, reserved: -1 },
      $unset: { lockExpiresAt: "" },
    }
  );

  console.log("Expired locks released:", result.modifiedCount);
};
