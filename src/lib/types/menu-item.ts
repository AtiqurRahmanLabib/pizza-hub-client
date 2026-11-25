export type MenuItem = {
  _id: string;
  vendorId: string;

  category: string;
  name: string;
  description: string;
  location: string;

  pizzeria: string;

  price: number;
  image: string;

  rating: number;
  reviewCount: number;

  status: "pending" | "approved" | "rejected";

  createdAt?: string;
  updatedAt?: string;
};

export type PostItem = {
  category: string;
  name: string;
  description: string;
  location: string;
  price: number;
  image: string;
};

export type UpdateMenuItem = Partial<PostItem>;
