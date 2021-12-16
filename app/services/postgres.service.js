const pg = require("pg");

class PostgresService {
  constructor() {
    this.connectionString = "postgresql://postgres:postgres@localhost:5432/ApoloSalud";
    this.pool = new pg.Pool({ connectionString: this.connectionString });
  }

  async executeSql(sql) {
    let result = await this.pool.query(sql);
    return result;
  }

  async executeSqlData(sql, data) {
    let result = await this.pool.query(sql, data);
    return result;
  }
}

module.exports = PostgresService;