export function validateMovieInput(
  input: unknown
): { valid: true; movie: string } | { valid: false; error: string } {
  if (typeof input !== "string") {
    return { valid: false, error: "Movie name must be a string." };
  }

  let trimmed = input.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: "Movie name is required." };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: "Movie name must be 100 characters or fewer." };
  }

  // Sanitize for prompt injection and XSS
  trimmed = trimmed
    .replace(/\$\{.*?\}/g, '') // Remove template literals
    .replace(/[<>]/g, '') // Remove angle brackets to prevent HTML injection
    .replace(/(?:\\n|\\r|\\t)/g, ' ') // Normalize whitespace characters
    .replace(/\/\*.*?\*\//gs, '') // Remove multi-line comments
    .replace(/\/\/.*$/gm, '') // Remove single-line comments
    .replace(/--.*$/gm, '') // Remove SQL-style comments
    .replace(/;.*$/gm, ''); // Remove potential command chaining

  return { valid: true, movie: trimmed };
}
