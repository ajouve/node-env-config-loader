var fs = require('fs');
var path = require('path');
var _ = require('lodash');

function load() {
    var config = _loadFile('config.json')
    var envConfig = _loadFile('config_' + process.env.APPLICATION_ENV + '.json')

    return _.defaults(_.merge(config, envConfig), _getEnvironmentVariablesConfig(), _getExtraConfig());
}

function _loadFile(name) {
    try {
        return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config', name)));
    } catch (e) {
        return {};
    }
}

function _getExtraConfig() {
    return {
        name: _getApplicationName()
    };
}

function _getEnvironmentVariablesConfig() {
    var config = {};
    var applicationKey = _getApplicationName().replace(/-/g, '_') + '_'
    _.forEach(process.env, function(value, key){
        if (key.indexOf(applicationKey) != 0) return;
        var path = key.replace(applicationKey, '').replace('_', '.')
        _.set(config, path, value);
    })

    return config;
}

function _getApplicationName() {
    return process.env.npm_package_name;
}

module.exports = load();
