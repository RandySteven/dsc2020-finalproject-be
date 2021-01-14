// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host : 'localhost',
      port: '3306',
      user : 'root',
      password : '',
      database : 'indonesia_covid_tracker'
    },
    migrations:{
      directory:__dirname + '/knex/migrations'
    },
    seeds:{
      directory:__dirname + '/knex/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
