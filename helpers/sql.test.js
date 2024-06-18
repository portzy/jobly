const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", function(){
    test("works: data to update", function () {
        const result = sqlForPartialUpdate(
          { firstName: "Aliya", age: 32 },
          { firstName: "first_name", age: "age" }
        );
        expect(result).toEqual({
          setCols: "\"first_name\"=$1, \"age\"=$2",
          values: ["Aliya", 32]
        });
      });
    test("works: no jsToSql mapping", function(){
        const result = sqlForPartialUpdate(
            { firstName: "Aliya", age: 32},
            {}
        );
        expect(result).toEqual({
            setCols: "\"firstName\"=$1, \"age\"=$2",
            values: ["Aliya", 32]
        });
    });
    test("throws BadRequestError if no data", function () {
        expect(() => {
          sqlForPartialUpdate({}, {});
        }).toThrow(BadRequestError);
      });
})