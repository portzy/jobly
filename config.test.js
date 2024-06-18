const config = require("./config");

describe("config can come from env", function () {
  test("works", function () {
    process.env.SECRET_KEY = "abc";
    process.env.PORT = "5000";
    process.env.DATABASE_URL = "other";
    process.env.BCRYPT_WORK_FACTOR = "12";
    process.env.NODE_ENV = "other";

    jest.resetModules();
    const newConfig = require("./config");

    expect(newConfig.SECRET_KEY).toEqual("abc");
    expect(newConfig.PORT).toEqual(5000);
    expect(newConfig.getDatabaseUri()).toEqual("other");
    expect(newConfig.BCRYPT_WORK_FACTOR).toEqual(12);

    delete process.env.SECRET_KEY;
    delete process.env.PORT;
    delete process.env.BCRYPT_WORK_FACTOR;
    delete process.env.DATABASE_URL;

    jest.resetModules();
    const defaultConfig = require("./config");

    expect(defaultConfig.getDatabaseUri()).toEqual("postgresql:///jobly");
    process.env.NODE_ENV = "test";

    expect(defaultConfig.getDatabaseUri()).toEqual("postgresql:///jobly_test");
  });
});
