export interface CRUD {
  list: () => Promise<any>;
  create: (dto: any) => Promise<any>;
  put: (dto: any) => Promise<any>;
  get: (id: number) => Promise<any>;
  delete: (id: number) => Promise<boolean>;
  patch: (dto: any) => Promise<any>;
}