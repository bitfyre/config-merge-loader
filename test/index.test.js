const assert = require('assert');
const configMergeLoader = require('../index.js');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');

describe('Config Merge Loader', function() {
  it('should return a function', function() {
    assert.equal(typeof configMergeLoader, 'function');
  });

  describe('when called via webpack', function() {
    beforeEach(function(done) {
      rimraf(path.resolve(__dirname, 'dist/entry.js'), function(err) {
        if (err) { return done(err); }

        done();
      });
    });

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
    };

    const compile = webpack(options);

    it('should generate an entry.js file', function(done) {
      compile.run(function(err, stats) {
        if(err) return done(err);

        assert.ok(fs.existsSync(path.resolve(__dirname, 'dist/entry.js')));
        done();
      });
    });

    it('should compile without errors', function(done) {
      compile.run(function(err, stats) {
        if(err) return done(err);

        assert.ok(stats.hasErrors() === false);
        done();
      });
    });

    it('base.js should provide properly merged results', function(done) {
      compile.run(function(err, stats) {
        if(err) return done(err);

        const modules = stats.toJson('normal').modules;
        const moduleIndex = modules.findIndex(function(module) {
          return module.name === './test/cases/lib/base.json';
        });
        const moduleSource = modules[moduleIndex].source;
        const expectedSource = 'module.exports = {\n\t"a": 2,\n\t"b": ' +
          '{\n\t\t"a": 2,\n\t\t"b": 1\n\t},\n\t"c": 1\n};';

        assert.equal(moduleSource, expectedSource);
        done();
      });
    });
  });

  describe('when chained with yaml-loader', function() {
    beforeEach(function(done) {
      rimraf(path.resolve(__dirname, 'dist/entry-yaml.js'), function(err) {
        if (err) { return done(err); }

        done();
      });
    });

    const options = {
      entry: path.resolve(__dirname, 'cases/test-yaml.js'),
      target: 'node',
      output: {
        filename: 'entry-yaml.js',
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
    };

    const compile = webpack(options);

    it('should generate an entry-yaml.js file', function(done) {
      compile.run(function(err, stats) {
        if(err) return done(err);

        assert.ok(fs.existsSync(path.resolve(__dirname, 'dist/entry-yaml.js')));
        done();
      });
    });

    it('should compile without errors', function(done) {
      compile.run(function(err, stats) {
        if(err) return done(err);

        assert.ok(stats.hasErrors() === false);
        done();
      });
    });
  });
});
