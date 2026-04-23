export default interface Brand {
  id: string;
  title: string;
  slug: string;
  description: string;
  logo: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
