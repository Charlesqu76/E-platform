import productStore from "./product";
import retailerStore from "./retailer";

const store = {
  retailer: retailerStore,
  ep: productStore,
};

export default store;
