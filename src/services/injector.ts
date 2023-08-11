// Separate injectors to avoid circulars

import { defaultImport } from 'default-import'
import getDecorators from 'inversify-inject-decorators'

import container from './container'

// NOTE: The `defaultImport` handles `exports.default =
// getDecorators` which does not export default value that
// is compatible with generated `esnext` module code.
const { lazyInject } = defaultImport(getDecorators)(container)

// RFE: Seems like a "good temporal solution" until the function decorators support becomes official.
// SEE: https://github.com/inversify/InversifyJS/blob/master/wiki/recipes.md#injecting-dependencies-into-a-function

// ALERT: Dumb inject is merely a substitute for the proper
// injection via the function decorators which are not yet
// available (or rather standardized). This function usage
// must be limited to the cases when it is absolutely
// necessary to perform injection via function (for
// instance, there's no direct access to the package base
// classes and package provides only factory methods).
const dumbInject =
  (fn: Function, dependencies: any[]): Function =>
    (...args: any[]) =>
      fn(...args, ...dependencies.map((dep: any) => container.get(dep)))

export { lazyInject, dumbInject }
