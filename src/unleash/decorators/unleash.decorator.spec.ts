import 'reflect-metadata';

import { UNLEASH_TOGGLE_KEY, UnleashToggle } from './unleash.decorator';

describe('UnleashToggle Decorator', () => {
  it('should set metadata with the correct key and value', () => {
    const toggleName = 'my-feature-toggle';

    class MyTestClass {
      @UnleashToggle(toggleName)
      public myTestMethod() {}
    }

    const decoratorValue = Reflect.getMetadata(
      UNLEASH_TOGGLE_KEY,
      MyTestClass.prototype.myTestMethod,
    );

    expect(decoratorValue).toBe(toggleName);
  });
});
