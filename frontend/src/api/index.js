const BASE_PATH = "http://localhost:3001/"

export const endpoints = {
    CATALOG_FILTER_DATA: BASE_PATH + "catalog-filter-data",
    BASKET_DATA: BASE_PATH + "products",
    FILTERED_DATA: BASE_PATH + "filter-data",
    PRODUCT_ITEMS: BASE_PATH + "product-items",  // + pagination-page
    ORDER_CALL: BASE_PATH + "order-call"

}