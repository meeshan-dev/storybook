export function mergeMotionProp<T>(prop: T, defaultValue: T): T {
  if (prop === undefined) {
    return defaultValue;
  }

  if (typeof prop === 'object') {
    return { ...defaultValue, ...prop };
  }

  return prop;
}
