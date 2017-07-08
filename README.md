# config-merge-loader for Webpack

A webpack loader for merging configuration or localization files with a base set at build time. It should work with most loaders that generate JSON.

## Installation

`npm install config-merge-loader --save`

## Usage

This is intended to be used with loaders that poduce a JSON out put, like the json-loader itself or the yaml-loader.

### Basic Usage

**base.json:**

```json
{
  "a": 1,
  "b": {
    "a": 1,
    "b": 1
  },
  "c": 1
}
```

**override.json:**

```json
{
  "a": 2,
  "b": {
    "a": 2
  }
}
```

**webpack.config.js:**

```javascript
{
  …
  module: {
   rules: [
     {
       test: /\.json$/, use: 'json-loader'
     },
     {
       test: /base\.json$/,
       use: [
         {
           loader: 'config-merge-loader',
           query: {
             override: 'override.json'
           }
         }
       ]
      }
    ]
  }
  …
}

```

Then in your application code you can do the following

**entry.js:**

```javascript
import config from './base.json'

const appConfig = JSON.parse(config);

console.log(appConfig);

```

Console result:

```javascript
{
  a: 2,
  b: {
    a: 2,
    b: 1
  },
  c: 1
}
```

### Usage With `yaml-loader`

**base.yml:**

```yaml
a: 1
b:
  a: 1
  b: 1
c: 1
```

**override.yml:**

```yaml
a: 2
b:
  a: 2
```

**webpack.config.js:**

```javascript
{
  …
  module: {
    rules: [
      {
        test: /\.yml$/, use: [
          { loader: 'json-loader' },
          { loader: 'yaml-loader' }
        ]
      },
      {
        test: /base\.yml$/,
        use: [
          {
            loader: 'config-merge-loader',
            query: {
              override: 'override.yml'
            }
          },
          { loader: 'yaml-loader' }
        ]
      }
    ]
  }
  …
}
```

Then in your application code you can do the following

**entry.js:**

```
import config from './base.yml'

const appConfig = JSON.parse(config);

console.log(appConfig);
```

Console result:

```
{
  a: 2,
  b: {
    a: 2,
    b: 1
  },
  c: 1
}
```

### Usage When Merging Different Namespaces

**base.yml:**

```yaml
locale:
  a: 1
  b:
    a: 1
    b: 1
  c: 1
```

**override.yml:**

```yaml
override:
  a: 2
  b:
    a: 2
```

**webpack.config.js:**

```javascript
{
  …
  module: {
    rules: [
      {
        test: /\.yml$/, use: [
          { loader: 'json-loader' },
          { loader: 'yaml-loader' }
        ]
      },
      {
        test: /base\-namespace\.yml$/,
        use: [
          {
            loader: 'config-merge-loader',
            query: {
              baseNamespace: 'locale',
              override: 'override-namespace.yml',
              overrideNamespace: 'override'
            }
          },
          { loader: 'yaml-loader' }
        ]
      }
    ]
  }
  …
}
```

Then in your application code you can do the following

**entry.js:**

```javascript
import locale from './base-namespace.yml'

const appLocale = JSON.parse(locale);

console.log(appLocale);
```

Console result:

```javascript
{
  locale: {
    a: 2,
    b: {
      a: 2,
      b: 1
    },
    c: 1
  }
}
```

## Options

`override` (required) string: Path to the override file. This will be merged in into the base file that is defined via an `import` or `require` statement.

`baseNamespace` (optional) string: the name of the key for the base object. This results in this name being kept in the output, and only it properties inside of it being updated.

`overrideNamespace` (optional) string: the name of top level key in the override object that will be used to override the base object.

**Note:** Currently `baseNamespace` and `overrideNamespace` can only select one level deep.
