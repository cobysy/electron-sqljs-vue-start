// Script to generate a sample db,
// which is bundled and ships with the electron application.

import * as fs from 'fs';
import { Database } from 'sql.js';

console.log('cwd: ' + process.cwd());

{
    // Create a database
    const db = new Database();

    // Execute some sql
    let sqlstr = 'CREATE TABLE hello (a int, b char);';
    sqlstr += 'INSERT INTO hello VALUES (0, \'hello\');';
    sqlstr += 'INSERT INTO hello VALUES (1, \'world\');';
    db.run(sqlstr);

    // Write database to the disk
    const data = db.export();
    const buffer = new Buffer(data);
    fs.writeFileSync(process.cwd() + '/public/hello.sqlite', buffer);
}

{
    // Read database from the disk
    const readBuffer = fs.readFileSync(process.cwd() + '/public/hello.sqlite');
    // Load the db
    const readDb = new Database(readBuffer);
    const res = readDb.exec('SELECT * FROM hello');

    console.log(res);
}
