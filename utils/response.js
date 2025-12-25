export function ok(data) {
  return {
    success: true,
    ...data,
    developer: "@lakshitpatidar"
  };
}

export function fail(message) {
  return {
    success: false,
    message,
    developer: "@lakshitpatidar"
  };
}
