const { BadRequestError } = require("../expressError");

// Ensures only specific field is updated and doesnt affect other fields
// i.e. updating a username and not updating a password or email

// dataToUpdate - object containing the fields to update + their new values
// jsToSql - object that maps JS style field names to the associated SQL columns

function sqlForPartialUpdate(dataToUpdate, jsToSql) {

  //extract field names from dataToUpdate and store them in keys array
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  // looks up corresponding SQL column name in jsToSql. uses original key name if none match
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  // returns string of SQL column assingments and the values to be updated
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
