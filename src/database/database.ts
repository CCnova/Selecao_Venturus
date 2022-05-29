import { Database } from "sqlite3";
import { DATABASE_PATH } from "../constants";

export default new Database(DATABASE_PATH, err => {
  if (err) throw new Error('Could not connect to the database!');
  console.log('Database connected succesfully!');
});