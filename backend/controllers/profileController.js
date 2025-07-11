// Simple controller to return logged-in user's basic profile
export const getMe = (req, res) => {
  const { _id, phone, name } = req.user;
  res.json({ _id, phone, name });
};
