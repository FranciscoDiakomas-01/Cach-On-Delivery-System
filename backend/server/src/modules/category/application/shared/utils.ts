export function slugify(title: string): string {
  return title
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function generateSKU(name: string) {
  const slug = (text: string) =>
    text.replace(/\s+/g, '').toUpperCase().slice(0, 3);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return [slug(name), random].filter(Boolean).join('-');
}
