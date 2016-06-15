# Node env config loader

Load config from files and environment.

## Default config file

The default config file is `config/config.json`

## Application environment config file

If the `APPLICATION_ENV` variable is set, the file related to will be loaded.

For example if `APPLICATION_ENV` is set to `live`, `config/config_live.json` will be loaded.

## Environment variables

All the variables beginning with your application name will try to be loaded.

For example if your application name is `my-app` and you have the following variables:

    process.env.my_app_port = 3000;
    process.env.my_app_redis_password = 'foobared';

 The config will contain the following json:

     {
         "port": 3000,
         "redis": {
             "password": "foobared"
         }
     }

## Extra configuration

The application name will be automatically added under the `name` key.
