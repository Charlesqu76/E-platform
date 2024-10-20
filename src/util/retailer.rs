use std::collections::HashMap;

use crate::model::retailer::{CategoryItem, SalesInfo};

type ProductCategory = HashMap<String, HashMap<String, CategoryItem>>;

pub fn categorize_data(
    data: &Vec<SalesInfo>,
) -> Result<ProductCategory, Box<dyn std::error::Error>> {
    let mut categorized: ProductCategory = HashMap::new();

    for item in data {
        let product_category = categorized
            .entry(item.name.clone())
            .or_insert_with(HashMap::new);

        let year_month = item.time.format("%Y-%m-%d").to_string();

        let summary = product_category.entry(year_month).or_insert(CategoryItem {
            quantity: 0,
            price: 0.0,
        });

        summary.quantity += item.quantity;
        summary.price = (summary.price + f64::from(item.price)) / f64::from(2)
    }

    Ok(categorized)
}
