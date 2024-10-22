"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_ORIGIN = exports.MONGO_URI = exports.PORT = exports.NODE_ENV = void 0;
const getEnv = (key, defaultValue) => {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
        throw new Error(`Missing enviroment key ${key}`);
    }
    return value;
};
exports.NODE_ENV = getEnv("NODE_ENV", "development");
exports.PORT = getEnv("PORT", "3000");
exports.MONGO_URI = getEnv("MONGO_URI");
exports.APP_ORIGIN = getEnv("APP_ORIGIN");
//Create a new .env file in the root of the project
//Add the following to the .env file
/*
    NODE_ENV=
    PORT=
    MONGO_URI=
    APP_ORIGIN=
*/ 
