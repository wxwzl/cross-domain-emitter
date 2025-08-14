// Jest setup file to handle ES module compatibility
import { TextEncoder, TextDecoder } from "util";

// Polyfill for TextEncoder/TextDecoder in Node.js environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock nanoid to avoid ES module issues
jest.mock("nanoid", () => ({
  nanoid: () => "test-id-" + Math.random().toString(36).substr(2, 9),
}));
