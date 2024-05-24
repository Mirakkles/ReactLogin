const jwt = require('jsonwebtoken')

module.exports = function (app, connection) {

  let refreshTokens = []
  const generateTokenAcceso = (user) =>{
      return jwt.sign({ID: user.ID, Rol: user.Rol}, "MySecretKey",
      {expiresIn: "15m"})
  }
  const generateTokenRefresh = (user) => {
    return jwt.sign(
      {ID: user.ID, Rol: user.Rol}, "MyRefreshSecretKey",
      {expiresIn: "15m"}
    )

  }

  const verify = (req, res, next) => {
    const AuthHeader = req.header.authorization;

    if(AuthHeader){
      jwt.verify(AuthHeader, "MySecretKey", (err, user) => {
        if(err){
          res.status(403).json("Tu token no es valido!")
        }
        req.user = user;
        next();
      })

    }else{
      res.status(401).json("No eres un usuario registrado!")
    }
  }

    app.get('/', (req, res) => {
      res.json({ "mensaje": "Todo bien" });
  
    });

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
      res.setHeader('Access-Control-Allow-Credentials', 'true'); 
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
      next();
    });

    app.get('/users', async (req, res) => {
        try {
          res.header('Access-Control-Allow-Origin', '*')
          const [rows, fields] = await connection.promise().query('SELECT * FROM test.usuarios');
          res.json(rows);
        } catch (err) {
          console.error('Error de Consulta', err);
          res.status(500).json({ error: 'Servidor' });
        }
      });

      app.get('/users/:userCode', async (req, res) => {
        try {
          res.header('Access-Control-Allow-Origin', '*')
          const userCode = req.params.userCode;
    
          const [result] = await connection.promise().query('SELECT * FROM usuarios WHERE ID = ?', [userCode]);
    
          if (result.length === 0) {
            return res.status(404).json({ message: 'El Usuario no existe' });
          }
    
          res.json(result[0]);
        } catch (err) {
          console.error('Error al traer usuario', err);
          res.status(500).json({ error: 'Error de servidor interno' });
        }
      });

      app.post('/users', async (req, res) => {
        try {
          res.header('Access-Control-Allow-Origin', '*')
          const { Nombre_Usuario, Pass } = req.body;
          const [result] = await connection.promise().query('INSERT INTO usuarios (Nombre_Usuario, Pass) VALUES (?, ?)', [Nombre_Usuario, Pass]);
    
          res.status(201).json({ message: 'Los datos se insertaron exitosamente', insertedId: result.insertId });
        } catch (err) {
          console.error('Error al insertar datos', err);
          res.status(500).json({ error: 'Error al insertar datos' });
        }
      });

      app.post('/login', async (req, res) => {
        try {
            const [rows, fields] = await connection.promise().query('SELECT * FROM test.usuarios');
            const { Nombre_Usuario, Pass } = req.body;
            const user = rows.find((u) => {
                return u.Nombre_Usuario === Nombre_Usuario && u.Pass === Pass;
            });
            if (user) {
              const acessToken = generateTokenAcceso(user);
              const refreshToken = generateTokenRefresh(user);
              refreshTokens.push(refreshToken);

                res.status(201).json({
                  Nombre_Usuario: user.Nombre_Usuario,
                  Rol: user.Rol,
                  acessToken,
                  refreshToken
                });
            } else {
                res.status(400).json("El usuario no existe");
            }
        } catch (err) {
            console.error('Error al insertar datos', err);
            res.status(500).json({ error: 'Error al insertar datos' });
        }
    });



    app.post('/refresh', (req, res) => {

      const refreshToken = req.body.token;

      //si no existe token mandara error
      if(!refreshToken){
        return res.status(401).json("El permiso no existe!")
      }
      if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json("No tienes el permiso adecuado")
      }

      jwt.verify(refreshToken, "MyRefreshSecretKey", (err, user) =>{
        err && console.log(err);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAcessToken = generateTokenAcceso(user);
        const newRefreshToken = generateTokenRefresh(user);

        refreshTokens.push(newRefreshToken);

        res.status(200).json({
          acessToken: newAcessToken,
          refreshToken: newRefreshToken
        })
      })
    })

    app.delete('/users/:userCode', verify, async (req, res) => {
      try {
        res.header('Access-Control-Allow-Origin', '*');

        const userCode = req.params.userCode;

        if(req.user.ID === userCode || req.user.Rol === "Admin")
        {
          const [result] = await connection.promise().query('DELETE FROM usuarios WHERE ID = ?', [userCode]);
          if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'El usuario no existe' });
        }else{

        res.status(200).json({ message: 'Usuario eliminado correctamente' });
        }
      }
    } catch (err) {
        console.error('Error al eliminar usuario', err);
        res.status(500).json({ error: 'Error de servidor interno' });
    }


    });

    

}