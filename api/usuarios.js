const oracledb = require('oracledb');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let connection;
    
    try {
      connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute('SELECT * FROM usuarios');
      
      res.status(200).json({
        success: true,
        data: result.rows
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}