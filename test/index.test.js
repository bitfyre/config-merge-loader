const assert = require('assert');
const configMergeLoader = require('../index.js');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

describe('Config Merge Loader', function() {
  it('should return a function', function() {
    assert.equal(typeof configMergeLoader, 'function');
  });

  describe('when called', function() {
    const loaderInput = 'Loader Content';

    xit('should return as string', function() {
      const loaderResult = configMergeLoader(loaderInput);
      assert.equal(typeof loaderResult, 'string');
    });

    xit('should return the same string it is given', function() {
      const loaderResult = configMergeLoader(loaderInput);
      assert.ok(loaderResult.indexOf(loaderInput) >= 0);
    });
  });

  describe('when called via webapck', function() {
    const options = {
      entry: path.resolve(__dirname, 'cases/test.js'),
      target: 'node',
      output: {
        filename: 'entry.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2'
      },
      resolveLoader: {
        alias: {
          'config-merge-loader': path.resolve(__dirname, '../', 'index.js')
        }
      },
      module: {
        rules: [
          {
            test: /base\.json$/,
            use: [
              {
                loader: 'config-merge-loader',
                query: {
                  override: 'override.json',
                  resolveTo: path.resolve(__dirname, 'lib')
                }
              },
              'json-loader'
            ]
          }
        ]
      }
    };

    const compile = webpack(options);

    it('should generate an entry.js file', function(done) {
      compile.run(function(err, stats) {
        if(err) return done(err);

        assert.ok(fs.existsSync(path.resolve(__dirname, 'dist/entry.js')));
        done();
      });
    });
  });
});
