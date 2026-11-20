// Reanimated declares this matcher only in its native typings, which TypeScript doesn't pick up here.
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveAnimatedStyle(
        style: Record<string, unknown>,
        config?: { shouldMatchAllProps?: boolean },
      ): R;
    }
  }
}

export {};
