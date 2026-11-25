// Server component: fetches data, then hands it to the client UI.
// Save as app/menu-items/page.tsx and put menu-items-view.tsx beside it.

import { getMenuItems } from "@/lib/actions/menuItemsApi";
import MenuItemsView, { type MenuItem } from "./menu-items-view";

export default async function MenuItemsPage() {
  const items: MenuItem[] = await getMenuItems();
  return <MenuItemsView items={items} />;
}
