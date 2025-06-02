export function debounce<F extends (...args: unknown[]) => unknown>(
  func: F,
  timeout = 300
): (...args: Parameters<F>) => void {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
