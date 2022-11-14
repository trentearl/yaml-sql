# YAML-SQL

This projects is a web application that maps http get requests to sql commands via a yaml file


##

To run in localdev:

- `docker compose up # starts mysql`
- `npm run dev`

this opens http://localhost:8888

-----

To run in other environments

`node index [path to the yaml] [port number]`

consfigure DB connection via environmental variables:

- `MYSQL_HOST`
- `MYSQL_USER`
- `MYSQL_DATABASE`
- `MYSQL_PASSWORD`

----

# TODO:

- Add more error handing
- Verify config file exists
- Option to bind to 0.0.0.0 for docker containers

