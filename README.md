# JS-Runtime-Section3

## Section 3: Extending the JS Runtime

### Overview
In this section, you will extend the JS runtime by adding custom methods like `console.warn()` and `console.error()` with unique formatting options such as color-coding and timestamps. Additionally, you will implement a `console.debug()` function that logs messages only when a debug flag is set.

### Steps
1. **Create Custom Methods**: Implement new console methods (e.g., `console.warn()`, `console.error()`) that format logs differently.
2. **Debug Logging**: Add a `console.debug()` method that logs messages conditionally based on a debug flag (environment variable or config file).
3. **Test and Refine**: Test the new methods by updating `example.js` and running `cargo run` to ensure the functionality works as expected.
