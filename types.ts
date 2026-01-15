import { Document } from 'mongoose';
import { Request } from 'express';
import { RedisClientType } from 'redis';

/**
 * Database configuration interface
 */
export interface DatabaseConfig {
    host: string;
    database: string;
    username: string;
    password: string;
}

/**
 * Redis configuration interface
 */
export interface RedisConfig {
    host: string;
    port: number;
    password: string;
}

/**
 * Application configuration interface
 */
export interface AppConfig {
    databaseConfig: DatabaseConfig;
    redisConfig: RedisConfig;
}

/**
 * Feature model interface
 */
export interface IFeature extends Document {
    isFeatured: boolean;
    position: number;
    title: string;
    text: string;
    highlightText?: string;
    backgroundImageUrl: string;
    productId?: string;
    link?: string;
    linkText?: string;
    customCssClass?: string;
    transparentBackground?: boolean;
    date: Date;
}

/**
 * Product Type model interface
 */
export interface IProductType extends Document {
    title: string;
    description?: string;
}

/**
 * Category model interface
 */
export interface ICategory extends Document {
    name: string;
    description?: string;
}

/**
 * Custom Express Request with additional properties
 */
export interface CustomRequest extends Request {
    csrfToken(): string;
}

/**
 * Redis client type
 */
export type CustomRedisClient = RedisClientType;
