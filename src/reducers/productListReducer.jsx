import { mockApi, products_url } from "../utils/mockApi";



/**Product list */
export async function productListReducer(productList, action){
  switch(action.type){
    case "get_product_list": {
      // call the api to get a list of products
      try {
        const response = await mockApi.get(products_url);
        return response.data;
      } catch(error){
        console.error(error.message);
      } finally {
        console.log("Get products completed.");
      }
      return;
    }
    default: {
      console.error(`Unknown action ${action.type}`);
    }
  }

}
