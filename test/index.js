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

    it('Should add the environment variables', function(){
        process.env.node_env_config_loader_testKey = 'testValue';
        process.env.node_env_config_loader_test_key = 'testValue';
        var config = require('../index.js');
        assert.equal('testValue', config.testKey);
        assert.equal('testValue', config.test.key);
    });
});
