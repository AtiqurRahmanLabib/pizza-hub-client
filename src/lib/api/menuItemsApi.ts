const BASE_URL = process.env.BASE_URL;

export const getMenuItems = async () => {
  const res = await fetch(`${BASE_URL}/menu-items`);
  return res.json();
};

export const getMenuItemById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/menu-items/${id}`);
  return res.json();
};
