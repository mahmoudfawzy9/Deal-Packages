require("dotenv").config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        // Use a different table name. Default: SequelizeMeta
        migrationStorageTableName: process.env.DB_MIGRATION_TABLE_NAME,
        seederStorage: "sequelize",
        seederStorageTableName: process.env.DB_SEEDER_TABLE_NAME
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        // Use a different table name. Default: SequelizeMeta
        migrationStorageTableName: process.env.DB_MIGRATION_TABLE_NAME,
        seederStorage: "sequelize",
        seederStorageTableName: process.env.DB_SEEDER_TABLE_NAME
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        // Use a different table name. Default: SequelizeMeta
        migrationStorageTableName: process.env.DB_MIGRATION_TABLE_NAME,
        seederStorage: "sequelize",
        seederStorageTableName: process.env.DB_SEEDER_TABLE_NAME
    },
};