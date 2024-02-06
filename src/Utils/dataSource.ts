import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { join } from "path";

require("dotenv").config();
console.log(process.env);

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: "postgres",

  synchronize: true,

  entities: [join(__dirname, "../models/**.ts")],
};

console.log(options);

const dataSource = new DataSource(options);

export default dataSource;
