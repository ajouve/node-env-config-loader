var assert = require('assert');

describe('Config', function(){

    afterEach(function(){
        process.chdir(process.env.PWD);
        delete require.cache[require.resolve('../index.js')];
    })

    it('Should not get the config from files', function(){
        var config = require('../index.js');
        assert.deepEqual({ name: 'node-env-config-loader' }, config);
    });

    it('Should get the default config', function(){
        process.chdir('test/dataSet1');
        var config = require('../index.js');
        assert.equal('testValue', config.testKey);
    });

    it('Should get the application environment config', function(){
        process.chdir('test/dataSet1');
        process.env.APPLICATION_ENV = 'test1';
        var config = require('../index.js');
        assert.equal('bar', config.foo);
    });

    it('Should override the default config', function(){
        process.chdir('test/dataSet1');
        process.env.APPLICATION_ENV = 'test2';
        var config = require('../index.js');
        assert.equal('newTestValue', config.testKey);
    });

    it('Should merge the environment config', function(){
        process.chdir('test/dataSet1');
        process.env.APPLICATION_ENV = 'test3';
        var config = require('../index.js');
        assert.deepEqual({key1:'value1', key2: 'newValue2'}, config.key);
    });

    it('Should add the environment variables', function(){
        process.env.node_env_config_loader_testKey = 'testValue';
        process.env.node_env_config_loader_test_key1 = 'testValue';
        process.env.node_env_config_loader_test_key2_key21 = 'testValue';
        var config = require('../index.js');
        assert.equal('testValue', config.testKey);
        assert.equal('testValue', config.test.key1);
        assert.equal('testValue', config.test.key2.key21);
    });

    it('Should override with environment variables', function(){
        process.env.node_env_config_loader_testKey = 'newTestValue';
        process.chdir('test/dataSet1');
        var config = require('../index.js');
        assert.equal('newTestValue', config.testKey);
    });

    it('Should override arrays', function(){
        process.chdir('test/dataSet1');
        process.env.APPLICATION_ENV = 'test4';
        var config = require('../index.js');
        assert.deepEqual([{name: 'newElement1'}, {name: 'elem2'}], config.array);
    });

    it('Should override if specified', function(){
        process.chdir('test/dataSet1');
        process.env.APPLICATION_ENV = 'test5';
        var config = require('../index.js');
        assert.deepEqual({"key1": "value2"}, config.key);
    });
});
