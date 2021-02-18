const sql = require('../config/db.config');

const Class = function(classroom) {
  this.grade = classroom.grade;
  this.name = classroom.name;
}

Class.create = (newClass, result) => {
  sql.query("INSERT INTO class set ?", newClass, (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("created class: ", { id: res.insertId, ...newClass});
      result(null, { id: res.insertId, ...newClass} );
    }
  })
}

Class.getAll = () => {
  sql.query("SELECT * FROM class", (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("Classes: ", res);
      result(null, res);
    }
  })
}

// Class.getByName = (className, result) => {
//   sql.query("SELECT * FROM class WHERE name LIKE ?\"%\"", className, (err, res) => {
//       if(err) {
//           console.log("error: ", err);
//           result(err, null);
//       } else {
//           if(res.length) {
//               console.log("found clients: ", res);
//               result(null, res);
//           } else {
//               result({ kind: "not found"}, null);
//           }
//       }
//   });
// };

Class.findById = (id, result) => {
  sql.query("SELECT * from class where id = ?", id, (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("found class: ", res[0]);
      result(null, res[0]);
    }
  })
}

Class.update = (id, classroom, result) => {
  sql.query("UPDATE class set grade = ?, name = ? where id = ?", [id, classroom.grade, classroom.name], (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      if(res.affectedRows == 0) {
        result({ kind: "Class not found" }, null);
      } else {
        console.log("Updated class: ", {id: id, ...classroom});
        result(null, {id: id, ...classroom});
      }
    }
  })
}

Class.remove = (id, result) => {
  sql.query("DELETE from class where id = ?", id, (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      if(res.affectedRows == 0) {
        result({ kind: "Class not found "}, null);
      } else {
        console.log('Deleted class with id: ', id);
        result(null, id);
      }
    }
  })
}

module.exports = Class;