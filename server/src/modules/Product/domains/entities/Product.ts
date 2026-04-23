export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  brandId: string;
  isActive: boolean;
  isFeatured: boolean;
  sku: string;
  price: number;
  compareAtPrice?: number;
  imageUrl?: string;
  sellCount: number;
  available: number;
  reserved: number;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
}
