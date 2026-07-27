-- Create databases
CREATE DATABASE IF NOT EXISTS menu_db;
CREATE DATABASE IF NOT EXISTS tables_db;
CREATE DATABASE IF NOT EXISTS order_db;


USE menu_db;

CREATE TABLE IF NOT EXISTS products (
                                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                        name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );


USE tables_db;

CREATE TABLE IF NOT EXISTS tables (
                                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                      table_number INT NOT NULL,
                                      capacity INT NOT NULL,
                                      status VARCHAR(50) DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );


USE order_db;

CREATE TABLE IF NOT EXISTS orders (
                                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                      table_id BIGINT NOT NULL,
                                      status VARCHAR(50) DEFAULT 'pending',
    total_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );