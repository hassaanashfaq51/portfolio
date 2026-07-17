export const verifyAdmin = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;

  const token = authHeader.split(' ')[1];
  if (!token) return false;

  const adminPassword = process.env.ADMIN_PASSWORD || 'Sycology1122';
  const expectedToken = 'admin_session_' + Buffer.from(adminPassword).toString('base64');

  return token === expectedToken;
};
