use std::collections::{BTreeMap, HashMap};

use chrono::Timelike;

use crate::model::retailer::{CategoryItem, Purchase, SalesInfo};

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

        summary.quantity += 1;
        summary.price = (summary.price + f64::from(item.price)) / f64::from(2)
    }

    Ok(categorized)
}

pub fn categorize_time_data(data: Vec<Purchase>) -> BTreeMap<String, u32> {
    let mut categories: BTreeMap<String, u32> = BTreeMap::new();

    // Initialize categories
    for i in (0..24).step_by(2) {
        categories.insert(format!("{:02}-{:02}", i, i + 2), 0);
    }

    // Categorize data
    for p in data {
        let hours = p.time.hour();
        let category = format!("{:02}-{:02}", (hours / 2) * 2, ((hours / 2) * 2) + 2);
        *categories.entry(category).or_insert(0) += 1;
    }

    categories
}
