const db = require("./../models");
const user = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        };


       db.user.create(user)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the USER."
                });
            });

};


exports.findAll = (req, res) => {
    const user = req.query.user;
    let condition = user ? { user: { [Op.iLike]: `%${user}%` } } : null;

    db.user.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving USERS."
            });
        });

};

exports.findOne = (req, res) => {
    const id = req.params.id;

    db.user.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find USER with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving USER with id=" + id + err.message
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    db.user.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "USER was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update USER with id=${id}. Maybe USER was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating USER with id=" + id + err.message
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    user.destroy({
        where: { "id": id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "USER was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete USER with id=${id}. Maybe USER was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete USER with id=" + id + err.message
            });
        });
};

exports.deleteAll = (req, res) => {
    user.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} USER were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all USER."
            });
        });
};

exports.findAllPublished = (req, res) => {
    db.user.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving USER."
            });
        });
};