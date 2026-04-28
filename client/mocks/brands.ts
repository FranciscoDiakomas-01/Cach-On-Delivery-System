import Brand from "@/types/Brand";

const brands: Brand[] = [
  {
    id: "1",
    title: "Nike",
    slug: "nike",
    description: "Marca global de artigos desportivos e lifestyle.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    isActive: true,
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-03-15"),
  },
  {
    id: "2",
    title: "Apple",
    slug: "apple",
    description: "Empresa de tecnologia focada em hardware e software premium.",
    logo: "https://www.apple.com/favicon.ico",
    isActive: true,
    createdAt: new Date("2024-11-20"),
    updatedAt: new Date("2025-02-01"),
  },
  {
    id: "3",
    title: "Samsung",
    slug: "samsung",
    description: "Multinacional de eletrónica e dispositivos móveis.",
    logo: "https://images.samsung.com/is/image/samsung/assets/us/about-us/brand/logo/pc/720_600_1.png?$720_N_PNG$",
    isActive: true,
    createdAt: new Date("2024-09-05"),
    updatedAt: new Date("2025-01-12"),
  },
  {
    id: "4",
    title: "Adidas",
    slug: "adidas",
    description: "Marca de roupa e calçado desportivo.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    isActive: false,
    createdAt: new Date("2024-07-18"),
    updatedAt: new Date("2024-12-30"),
  },
  {
    id: "5",
    title: "Puma",
    slug: "puma",
    description:
      "Marca de vestuário e calçado desportivo com foco em performance.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Puma-logo-%28text%29.svg",
    isActive: true,
    createdAt: new Date("2025-02-14"),
    updatedAt: new Date("2025-04-10"),
  },
];
export default brands;
