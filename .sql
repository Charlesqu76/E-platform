DROP TABLE IF EXISTS view;
DROP TABLE IF EXISTS purchase;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS retailer;
DROP TABLE IF EXISTS customer;




CREATE TABLE
    customer (
        id SERIAL PRIMARY KEY,
        email varchar(255) UNIQUE,
        name varchar(255),
        password varchar(255),
        -- 0 -> undefined 1 -> male 2 -> female
        gender int DEFAULT 0
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
        -- [NSW,VIC,QLD,SA,WA,TAS,ACT,NT]
        geo varchar(255) NOT NULL,
        -- [PHONE, LAPTOP]
        device varchar(255) NOT NULL,
        comment text,
        rate int
    );

CREATE TABLE
    view (
        id SERIAL PRIMARY KEY,
        time TIMESTAMP DEFAULT NOW (),
        customer int NOT NULL REFERENCES customer,
        product int NOT NULL REFERENCES product,
        -- [NSW,VIC,QLD,SA,WA,TAS,ACT,NT]
        geo varchar(255) NOT NULL,
        -- [PHONE, LAPTOP]
        device varchar(255) NOT NULL
    );

INSERT INTO
    customer (email, name, password, gender)
VALUES
    (
        'alice.johnson@example.com',
        'Alice Johnson',
        'password123',
        0
    ),
    ('bob.smith@example.com', 'Bob Smith', 'qwerty456', 1),
    (
        'charlie.brown@example.com',
        'Charlie Brown',
        'letmein789',
        1
    ),
    (
        'diana.prince@example.com',
        'Diana Prince',
        'wonderwoman321',
        1
    ),
    (
        'ethan.hunt@example.com',
        'Ethan Hunt',
        'missionimpossible123',2

    ),
    (
        'fiona.gallagher@example.com',
        'Fiona Gallagher',
        'shameless456',
        2
    ),
    (
        'george.costanza@example.com',
        'George Costanza',
        'serenitynow789',
        2
    ),
    (
        'hannah.baker@example.com',
        'Hannah Baker',
        'thirteenreasons456',0
    ),
    (
        'ian.malcolm@example.com',
        'Ian Malcolm',
        'dinosaursrule123',2

    ),
    (
        'jasmine.thomas@example.com',
        'Jasmine Thomas',
        'aladdin123',2
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

INSERT INTO purchase (time, price, customer, product, geo, device, comment, rate)
SELECT
    -- Random timestamp between 2023-01-01 and NOW()
    TIMESTAMP '2023-01-01' + random() * (NOW() - TIMESTAMP '2023-01-01'),

    -- Random price between 1 and 1000
    FLOOR(1 + random() * 1000)::int,

    -- Random customer ID between 1 and 9
    FLOOR(1 + random() * 9)::int,

    -- Random product ID between 1 and 4
    FLOOR(1 + random() * 4)::int,

    -- Random geo value from the list [NSW, VIC, QLD, SA, WA, TAS, ACT, NT]
    (ARRAY['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'])[FLOOR(1 + random() * 8)::int],

    -- Random device value from the list [PHONE, LAPTOP]
    (ARRAY['PHONE', 'LAPTOP'])[FLOOR(1 + random() * 2)::int],

    -- Random comment (null or some text for simplicity)
    CASE
        WHEN random() < 0.5 THEN NULL
        ELSE 'Sample comment ' || FLOOR(random() * 1000)::text
    END,

    -- Random rate between 1 and 5, or NULL
    CASE
        WHEN random() < 0.7 THEN FLOOR(1 + random() * 5)::int
        ELSE NULL
    END

FROM generate_series(1, 100) AS s;
-- view
INSERT INTO view (time, customer, product, geo, device)
SELECT
    -- Random timestamp between 2023-01-01 and NOW()
    TIMESTAMP '2023-01-01' + random() * (NOW() - TIMESTAMP '2023-01-01'),

    -- Random customer ID between 1 and 9
    FLOOR(1 + random() * 9)::int,

    -- Random product ID between 1 and 4
    FLOOR(1 + random() * 4)::int,

    -- Random geo value from the list [NSW, VIC, QLD, SA, WA, TAS, ACT, NT]
    (ARRAY['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT'])[FLOOR(1 + random() * 8)::int],

    -- Random device value from the list [PHONE, LAPTOP]
    (ARRAY['PHONE', 'LAPTOP'])[FLOOR(1 + random() * 2)::int]

FROM generate_series(1, 1000) AS s;