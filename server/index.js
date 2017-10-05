var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "dedeMe",
  password: "abc123",
  database: "Chirps"
});

var clientPath = path.join(__dirname, "../client");

app.get('/chirps/*', function(req, res) {
    res.sendFile(path.join(clientPath, 'single_view.html'));
});

app.get('/chirps/*/update', function(req, res) {
    res.sendFile(path.join(clientPath, 'single_update.html'));
});

app.get('/chirps', function(req, res) {
    res.sendFile(path.join(clientPath, 'list.html'));
});

app.use(express.static(clientPath));
app.use(bodyParser.json());

app
  .route("/api/chirps")
  .get(function(req, res) {
    rows("ChirpUser")
      .then(function(chirps) {
        res.send(chirps);
      })
      .catch(function(err) {
        console.log(err);
        res.sendStatus(500);
      });
  })
  .post(function(req, res) {
    var newChirp = req.body;
    row("InsertChirp", [newChirp.message, newChirp.userid])
      .then(function(id) {
        res.status(201).send(id);
      })
      .catch(function(err) {
        console.log(err);
        res.sendStatus(500);
      });
  });

app.route('/api/chirps/:id')
    .get(function(req, res) {
        row('GetSingleChirp', [req.params.id])
        .then(function(chirp) {
            res.send(chirp);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    }).put(function(req, res) {
        empty('UpdateChirp', [req.params.id, req.body.message])
        .then(function() {
            res.sendStatus(204);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    }).delete(function(req, res) {
        empty('DeleteChirp', [req.params.id])
        .then(function() {
            res.sendStatus(204);
        }).catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

app.route("/api/users").get(function(req, res) {
  rows("GetUsers")
    .then(function(users) {
      res.send(users);
    })
    .catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
});

app.listen(3000);

function callProcedure(procedureName, args) {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err);
      } else {
        var placeholders = "";
        if (args && args.length > 0) {
          for (var i = 0; i < args.length; i++) {
            if (i === args.length - 1) {
  
              placeholders += "?";
            } else {
              placeholders += "?,";
            }
          }
        }
        var callString = "CALL " + procedureName + "(" + placeholders + ");"; 
        connection.query(callString, args, function(err, resultsets) {
          connection.release();
          if (err) {
            reject(err);
          } else {
            resolve(resultsets);
          }
        });
      }
    });
  });
}

function rows(procedureName, args) {
  return callProcedure(procedureName, args).then(function(resultsets) {
    return resultsets[0];
  });
}

function row(procedureName, args) {
  return callProcedure(procedureName, args).then(function(resultsets) {
    return resultsets[0][0];
  });
}

function empty(procedureName, args) {
  return callProcedure(procedureName, args).then(function() {
    return;
  });
}
