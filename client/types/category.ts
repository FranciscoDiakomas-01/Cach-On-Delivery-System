export interface ICategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  isActive: boolean;
  isFeatured: boolean;
  parentId: string | null;
  level: number;
  createdAt: Date;
  updatedAt: Date;
  parent: ICategory | undefined;
  children: ICategory[];
}
