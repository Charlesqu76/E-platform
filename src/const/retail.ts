enum ERetailerPath {
  product = "product",
  portrait = "portrait",
  sales = "sales",
}

export const RETAILRE_PATH = [
  ERetailerPath.portrait,
  ERetailerPath.product,
  ERetailerPath.sales,
];

export const RETAILRE_PATH_MAP = RETAILRE_PATH.map((v: string) => {
  return {
    key: v,
    label: v.toUpperCase(),
  };
});
