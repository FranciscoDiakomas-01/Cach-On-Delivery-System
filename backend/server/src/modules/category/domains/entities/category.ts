import { ICategory } from '../interface';

export default class Category {
  constructor(private data: ICategory) {}

  get id() {
    return this.data.id;
  }

  get parentId() {
    return this.data.parentId;
  }

  get level() {
    return this.data.level;
  }

  activate() {
    this.data.isActive = true;
    this.touch();
  }

  deactivate() {
    this.data.isActive = false;
    this.touch();
  }

  feature() {
    this.data.isFeatured = true;
    this.touch();
  }

  unfeature() {
    this.data.isFeatured = false;
    this.touch();
  }

  set setParent(parent: ICategory | null) {
    this.data.parentId = parent?.id ?? null;
    this.data.level = parent ? parent.level + 1 : 0;
    this.touch();
  }

  set update(data: Partial<Omit<ICategory, 'id' | 'createdAt' | 'updatedAt'>>) {
    Object.assign(this.data, data);
    this.touch();
  }

  get(): ICategory {
    return this.data;
  }

  private touch() {
    this.data.updatedAt = new Date();
  }
}
