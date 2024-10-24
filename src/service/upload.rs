use std::{fs::File, io::Write};

use actix_multipart::Multipart;
use actix_web::{post, web, HttpResponse};
use futures::{StreamExt, TryStreamExt};
use uuid::Uuid;

use crate::{model::FileReturn, util::create};

#[post("upload")]
async fn save_file(mut payload: Multipart) -> Result<HttpResponse, actix_web::Error> {
    let mut saved_file_path = String::new();

    // Iterate over multipart stream
    while let Ok(Some(mut field)) = payload.try_next().await {
        let content_type = field.content_disposition();
        let filename = content_type.get_filename().unwrap();

        create(&"./uploads".to_string());
        // Generate a unique filename to avoid collisions
        let file_path = format!("./uploads/{}_{}", Uuid::new_v4(), &filename);
        saved_file_path = file_path.clone(); // Save the file path to return it later

        // Create a file in the destination directory
        let mut f = web::block(move || File::create(&file_path))
            .await
            .unwrap()
            .map_err(actix_web::error::ErrorInternalServerError)?;

        // Write chunks into the file
        while let Some(chunk) = field.next().await {
            let data = chunk.unwrap();
            f = web::block(move || f.write_all(&data).map(|_| f))
                .await
                .unwrap()
                .unwrap();
        }
    }

    // Return the path of the saved file
    Ok(HttpResponse::Ok().json(FileReturn {
        filepath: saved_file_path,
    }))
}
