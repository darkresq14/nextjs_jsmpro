export enum ResourceCategoriesEnum {
  all = 'All',
  next13 = 'Next 13',
  frontend = 'Frontend',
  backend = 'Backend',
  fullstack = 'Fullstack',
}

export interface SanityResourceInterface {
  _id: string;
  title: string;
  slug: string;
  downloadLink: string;
  views: number;
  poster: string;
  category: ResourceCategoriesEnum;
}

export interface SanityResourcePlaylistInterface {
  _id: string;
  title: string;
  resources: SanityResourceInterface[];
}
