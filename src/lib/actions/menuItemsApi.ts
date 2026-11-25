const BASE_URL = process.env.BASE_URL;

export const getMenuItems = async () => {
  const res = await fetch(`${BASE_URL}/menu-items`);
  return res.json();
};
