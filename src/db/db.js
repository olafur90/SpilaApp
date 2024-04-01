import { enablePromise, openDatabase } from 'react-native-sqlite-storage';

// Enable promise for SQLite
enablePromise(true);

export const connectToDatabase = async () => {
  return openDatabase(
    { name: 'yourProjectName.db', location: 'default' },
    () => {},
    error => {
      console.error(error);
      throw Error('Could not connect to database');
    },
  );
};

export const createTables = async db => {
  const createScrabbleTableQuery = `
    CREATE TABLE IF NOT EXISTS Scrabble (
      id INTEGER PRIMARY KEY AUTOINCREMENT

    )
  `;
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      wins INTEGER
    )
  `;
  try {
    await db.executeSql(createScrabbleTableQuery);
    await db.executeSql(createUsersTableQuery);
  } catch (error) {
    console.error(error);
    throw Error('Failed to create tables');
  }
};

export const getTableNames = async db => {
  try {
    const tableNames = [];
    const results = await db.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table'",
    );
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        tableNames.push(result.rows.item(index).name);
      }
    });
    return tableNames;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get table names from database');
  }
};

/*

export const removeTable = async (db, tableName) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;
  try {
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to drop table ${tableName}`);
  }
};
export const addContact = async (db, contact) => {
  const insertQuery = `
     INSERT INTO Contacts (firstName, name, phoneNumber)
     VALUES (?, ?, ?)
   `;
  const values = [contact.firstName, contact.name, contact.phoneNumber];
  try {
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to add contact');
  }
};
*/

// TODO: Finish implementing SQLite functions, more info here:
// https://medium.com/@julien-ctx/integrating-sqlite-with-react-native-a-beginners-tutorial-a74bbe34ac6a
