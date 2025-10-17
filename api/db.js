const oracledb = require('oracledb');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING
};

export default async function handler(req, res) {
  let connection;
  
  try {
    connection = await oracledb.getConnection(dbConfig);
    
    // Consulta de prueba
    const result = await connection.execute(
      `SELECT SYSDATE as fecha FROM dual`
    );
    
    res.status(200).json({ 
      success: true, 
      message: 'Conexión exitosa a Oracle',
      fecha: result.rows[0][0]
    });
    
  } catch (error) {
    console.error('Error en conexión Oracle:', error);
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
}