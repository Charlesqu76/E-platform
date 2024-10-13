CREATE TABLE
    customer (
        id SERIAL PRIMARY KEY,
        email varchar(255) UNIQUE,
        name varchar(255),
        password varchar(255)
    );

CREATE TABLE
    retailer (
        id SERIAL PRIMARY KEY,
        email varchar(255) UNIQUE,
        name varchar(255),
        password varchar(255)
    );

CREATE TABLE
    product (
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE,
        description text,
        price float NOT NULL CHECK (price > 0),
        quantity int NOT NULL CHECK (quantity > 0),
        remain_quantity int CHECK (remain_quantity > 0),
        release_date TIMESTAMP DEFAULT NOW (),
        retailer int NOT NULL REFERENCES retailer
    );

CREATE TABLE
    purchase (
        id SERIAL PRIMARY KEY,
        time TIMESTAMP DEFAULT NOW (),
        price int NOT NULL CHECK (price > 0),
        customer int NOT NULL REFERENCES customer,
        product int NOT NULL REFERENCES product,
        comment text,
        rate int
    );

CREATE TABLE
    view (
        id SERIAL PRIMARY KEY,
        time TIMESTAMP DEFAULT NOW (),
        customer int NOT NULL REFERENCES customer,
        product int NOT NULL REFERENCES product
    );

INSERT INTO
    customer (email, name, password)
VALUES
    (
        'alice.johnson@example.com',
        'Alice Johnson',
        'password123'
    ),
    ('bob.smith@example.com', 'Bob Smith', 'qwerty456'),
    (
        'charlie.brown@example.com',
        'Charlie Brown',
        'letmein789'
    ),
    (
        'diana.prince@example.com',
        'Diana Prince',
        'wonderwoman321'
    ),
    (
        'ethan.hunt@example.com',
        'Ethan Hunt',
        'missionimpossible123'
    ),
    (
        'fiona.gallagher@example.com',
        'Fiona Gallagher',
        'shameless456'
    ),
    (
        'george.costanza@example.com',
        'George Costanza',
        'serenitynow789'
    ),
    (
        'hannah.baker@example.com',
        'Hannah Baker',
        'thirteenreasons456'
    ),
    (
        'ian.malcolm@example.com',
        'Ian Malcolm',
        'dinosaursrule123'
    ),
    (
        'jasmine.thomas@example.com',
        'Jasmine Thomas',
        'aladdin123'
    );

INSERT INTO
    retailer (email, name, password)
VALUES
    (
        'retailer1@example.com',
        'Retailer One',
        'retailpass1'
    ),
    (
        'retailer2@example.com',
        'Retailer Two',
        'retailpass2'
    );

INSERT INTO
    product (
        name,
        description,
        price,
        quantity,
        remain_quantity,
        retailer
    )
VALUES
    (
        'Wireless Bluetooth Headphones',
        'High-quality wireless headphones with noise cancellation.',
        89.99,
        150,
        120,
        1
    ),
    (
        'Portable Bluetooth Speaker',
        'Compact speaker with rich sound and deep bass.',
        49.99,
        200,
        180,
        1
    ),
    (
        'Smartphone Tripod Stand',
        'Adjustable tripod for stable smartphone photography.',
        25.99,
        100,
        90,
        1
    ),
    (
        'Fitness Tracker Watch',
        'Monitor your heart rate, steps, and sleep patterns.',
        69.99,
        80,
        70,
        1
    ),
    (
        'Wireless Charger Pad',
        'Fast charging for all Qi-enabled devices.',
        19.99,
        300,
        250,
        1
    ),
    (
        'USB-C to USB Adapter',
        'Easily connect your USB devices to USB-C ports.',
        12.99,
        400,
        350,
        1
    ),
    (
        'Laptop Stand with Cooling Fans',
        'Ergonomic laptop stand with built-in cooling.',
        39.99,
        150,
        130,
        1
    ),
    (
        'Noise Cancelling Earbuds',
        'True wireless earbuds with superior sound quality.',
        79.99,
        60,
        50,
        1
    ),
    (
        'Smart Home Plug',
        'Control your appliances remotely with your smartphone.',
        29.99,
        250,
        230,
        1
    ),
    (
        'HDMI to VGA Adapter',
        'Connect HDMI devices to VGA monitors or projectors.',
        15.99,
        150,
        140,
        1
    );

INSERT INTO
    purchase (time, price, customer, product, comment, rate)
VALUES
    (
        '2023-01-01',
        100,
        1,
        1,
        'The product was good quality and arrived on time. I would definitely recommend it.',
        4
    ),
    (
        '2023-02-01',
        200,
        2,
        2,
        'I love this product! It is so easy to use and has made my life so much easier. I would definitely recommend it to anyone.',
        5
    ),
    (
        '2023-03-01',
        300,
        3,
        3,
        'The product was okay, but not as good as I expected. It was a bit overpriced for what it is.',
        3
    ),
    (
        '2023-04-01',
        400,
        4,
        4,
        'I was disappointed with this product. It did not work as well as I had hoped.',
        2
    ),
    (
        '2023-05-01',
        500,
        5,
        5,
        'I hated this product! It was broken when it arrived and the customer service was terrible.',
        1
    ),
    (
        '2023-06-01',
        600,
        6,
        1,
        'The product was good quality and arrived on time. I would definitely recommend it.',
        4
    ),
    (
        '2023-07-01',
        700,
        7,
        2,
        'I love this product! It is so easy to use and has made my life so much easier. I would definitely recommend it to anyone.',
        5
    ),
    (
        '2023-08-01',
        800,
        8,
        3,
        'The product was okay, but not as good as I expected. It was a bit overpriced for what it is.',
        3
    ),
    (
        '2023-09-01',
        900,
        9,
        4,
        'I was disappointed with this product. It did not work as well as I had hoped.',
        2
    ),
    (
        '2023-10-01',
        1000,
        10,
        5,
        'I hated this product! It was broken when it arrived and the customer service was terrible.',
        1
    ),
    (
        '2023-11-01',
        1100,
        1,
        1,
        'The product was good quality and arrived on time. I would definitely recommend it.',
        4
    ),
    (
        '2023-12-01',
        1200,
        2,
        2,
        'I love this product! It is so easy to use and has made my life so much easier. I would definitely recommend it to anyone.',
        5
    ),
    (
        '2024-01-01',
        1300,
        3,
        3,
        'The product was okay, but not as good as I expected. It was a bit overpriced for what it is.',
        3
    ),
    (
        '2024-02-01',
        1400,
        4,
        4,
        'I was disappointed with this product. It did not work as well as I had hoped.',
        2
    ),
    (
        '2024-03-01',
        1500,
        5,
        5,
        'I hated this product! It was broken when it arrived and the customer service was terrible.',
        1
    ),
    (
        '2024-04-01',
        1600,
        6,
        1,
        'The product was good quality and arrived on time. I would definitely recommend it.',
        4
    ),
    (
        '2024-05-01',
        1700,
        7,
        2,
        'I love this product! It is so easy to use and has made my life so much easier. I would definitely recommend it to anyone.',
        5
    ),
    (
        '2024-06-01',
        1800,
        8,
        3,
        'The product was okay, but not as good as I expected. It was a bit overpriced for what it is.',
        3
    ),
    (
        '2024-07-01',
        1900,
        9,
        4,
        'I was disappointed with this product. It did not work as well as I had hoped.',
        2
    ),
    (
        '2024-08-01',
        2000,
        10,
        5,
        'I hated this product! It was broken when it arrived and the customer service was terrible.',
        1
    );

INSERT INTO
    purchase (time, price, customer, product, comment, rate)
VALUES
    (
        '2024-09-01',
        2100,
        1,
        1,
        'The product was great! It exceeded my expectations.',
        5
    ),
    (
        '2024-10-01',
        2200,
        2,
        2,
        'I was very satisfied with my purchase. The product is high quality.',
        5
    ),
    (
        '2024-11-01',
        2300,
        3,
        3,
        'The product was a bit disappointing. It did not meet my needs.',
        3
    ),
    (
        '2024-12-01',
        2400,
        4,
        4,
        'I had a great experience shopping here. The customer service was excellent.',
        5
    ),
    (
        '2025-01-01',
        2500,
        5,
        5,
        'I m not happy with the product. It is broken and the warranty is useless.',
        1
    ),
    (
        '2025-02-01',
        2600,
        6,
        1,
        'I love this product! It is exactly what I was looking for.',
        5
    ),
    (
        '2025-03-01',
        2700,
        7,
        2,
        'The product is okay, but I think it could be better.',
        3
    ),
    (
        '2025-04-01',
        2800,
        8,
        3,
        'I am very impressed with the quality of the product.',
        5
    ),
    (
        '2025-05-01',
        2900,
        9,
        4,
        'I had a few issues with the product, but the customer service was helpful.',
        4
    ),
    (
        '2025-06-01',
        3000,
        10,
        5,
        'I am so glad I bought this product. It is changed my life.',
        5
    ),
    (
        '2025-07-01',
        3100,
        1,
        1,
        'The product is exactly as described and I am very happy with it.',
        5
    ),
    (
        '2025-08-01',
        3200,
        2,
        2,
        'I had a bad experience with the product. It was defective and the company was unhelpful.',
        1
    ),
    (
        '2025-09-01',
        3300,
        3,
        3,
        'The product is good, but I think it could be better for the price.',
        3
    ),
    (
        '2025-10-01',
        3400,
        4,
        4,
        'I am very satisfied with my purchase. The product is exactly what I needed.',
        5
    ),
    (
        '2025-11-01',
        3500,
        5,
        5,
        'I am not impressed with the product. It is not as durable as I expected.',
        3
    ),
    (
        '2025-12-01',
        3600,
        6,
        1,
        'I love this product! It is the best thing I have bought in a long time.',
        5
    ),
    (
        '2026-01-01',
        3700,
        7,
        2,
        'The product is okay, but I think it could be improved.',
        3
    ),
    (
        '2026-02-01',
        3800,
        8,
        3,
        'I am very impressed with the quality of the product.',
        5
    ),
    (
        '2026-03-01',
        3900,
        9,
        4,
        'I had a few issues with the product, but the customer service was helpful.',
        4
    ),
    (
        '2026-04-01',
        4000,
        10,
        5,
        'I am so glad I bought this product. It is changed my life.',
        5
    ),
    (
        '2026-05-01',
        4100,
        1,
        1,
        'The product is exactly as described and I am very happy with it.',
        5
    ),
    (
        '2026-06-01',
        4200,
        2,
        2,
        'I had a bad experience with the product. It was defective and the company was unhelpful.',
        1
    ),
    (
        '2026-07-01',
        4300,
        3,
        3,
        'The product is good, but I think it could be better for the price.',
        3
    ),
    (
        '2026-08-01',
        4400,
        4,
        4,
        'I am very satisfied with my purchase. The product is exactly what I needed.',
        5
    ),
    (
        '2026-09-01',
        4500,
        5,
        5,
        'I am not impressed with the product. It is not as durable as I expected.',
        3
    ),
    (
        '2026-10-01',
        4600,
        6,
        1,
        'I love this product! It is the best thing I have bought in a long time.',
        5
    ),
    (
        '2026-11-01',
        4700,
        7,
        2,
        'The product is okay, but I think it could be improved.',
        3
    ),
    (
        '2026-12-01',
        4800,
        8,
        3,
        'I am very impressed with the quality of the product.',
        5
    ),
    (
        '2027-01-01',
        4900,
        9,
        4,
        'I had a few issues with the product, but the customer service was helpful.',
        4
    ),
    (
        '2027-02-01',
        5000,
        10,
        5,
        'I am so glad I bought this product. It is changed my life.',
        5
    );

-- view
DO $$ 
BEGIN 
    FOR i IN 1..2000 LOOP 
        INSERT INTO view (time, customer, product) VALUES
        (TO_TIMESTAMP('2023-01-01 00:00:00', 'YYYY-MM-DD HH24:MI:SS') + (RANDOM() * (NOW() - TO_TIMESTAMP('2023-01-01 00:00:00', 'YYYY-MM-DD HH24:MI:SS'))), 
         (FLOOR(RANDOM() * 5) + 1),  -- Customer ID between 1 and 5
         (FLOOR(RANDOM() * 5) + 1)   -- Product ID between 1 and 5
        );
    END LOOP; 
END $$;