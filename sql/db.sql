CREATE TABLE LOGS_APP(
    ID UUID PRIMARY KEY,
    DESCRIPTION TEXT NOT NULL,
    DATE_CREATE DATE
);
CREATE TABLE INVENTORY (
    ID UUID PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL
);
CREATE TABLE CATEGORIES (
    ID UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    NAME VARCHAR(255) NOT NULL
);
CREATE TABLE PRODUCTS (
    ID UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    CATEGORY_ID UUID NOT NULL,
    NAME VARCHAR(255) NOT NULL,
    BRAND VARCHAR(255)
);
ALTER TABLE PRODUCTS
ADD CONSTRAINT FK_PRODUCT_CATEGORY FOREIGN KEY (CATEGORY_ID) REFERENCES PUBLIC.CATEGORIES (ID) ON DELETE CASCADE;
CREATE TABLE PRODUCTS_IN_INVENTORIES (
    ID UUID PRIMARY KEY,
    PRODUCT_ID UUID NOT NULL,
    INVENTORY_ID UUID NOT NULL
);
CREATE TABLE PRODUCTS_VARIANTS (
    ID UUID PRIMARY KEY,
    PRODUCTS_IN_INVENTORIES_ID UUID,
    STOCK DECIMAL(1, 12) NOT NULL,
    DESCRIPCTION VARCHAR(255) NOT NULL
);
CREATE TYPE UNIT_TYPE AS ENUM (
    'meter',
    -- Metros
    'liters',
    -- Litros
    'grams',
    -- Gramos
    'unit' -- Unidad
);
CREATE TYPE UNIT_TYPE_PREFIX AS ENUM (
    'k',
    -- 1000
    'h',
    -- 100
    'deg',
    -- 10
    'dec',
    -- 0.1
    'c',
    -- 0.01
    'm',
    -- 0.001
    'ten',
    -- 10,
    'hundred' -- 100
);
-- Enumerado de tipo Masa gramos , Longitud metros , capacidad Litros
--- Procesos
---* Registro de un producto
DO $$
declare category_id uuid;
begin
INSERT INTO categories (name)
VALUES ('Viveres')
RETURNING id into category_id;
RAISE NOTICE 'id categoria: %s',
category_id;
INSERT INTO products (name, brand, category_id)
VALUES ('Harina Pan', 'Polar', category_id);
end $$;
END;
---* Registro de entradas
---* Registro de salidas
---* Cálculo del costo de los bienes vendidos
---* Cálculo del inventario final
---
DROP TYPE UNIT_TYPE;
DROP TYPE UNIT_TYPE_PREFIX;
DROP TABLE PRODUCTS_IN_INVENTORIES;
DROP TABLE PRODUCTS_VARIANTS;
DROP TABLE LOGS_APP;
DROP TABLE PRODUCTS;
DROP TABLE CATEGORIES;
DROP TABLE INVENTORY;