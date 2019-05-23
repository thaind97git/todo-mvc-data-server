const todoModel = require('./todo.model');

function isNullOrEmpty(string) {
    if (string.trim() == "" || string === null) {
        return true;
    }
    return false;
}

function isBoolean(value) {
    if (value === true || value === false) {
        return true;
    }
    return false;
}

function errorHandler(response, error) {
    response.status(500).json({ data: null, error: true, message: `Catch: ${error.message}` })
}

function successFunc(response, data) {
    return response.status(200).json({ data: data, error: false, message: "success" })
}

const getAllTodo = function (request, response) {
    todoModel.find((err, rs) => {
        return response.status(200).json({ data: rs, error: false, message: null })
    })
}

const addTodo = (request, response) => {
    try {
        const { title } = request.body;
        const todo = {
            title: title,
            isComplete: false
        }
        todoModel.create(todo)
            .then((rs) => {
                return successFunc(response, todo);
            }, (err) => {
                return response.status(400).json({ data: null, error: true, message: err.message })
            })
    } catch (error) {
        return errorHandler(response, error)
    }
}

const updateCompleteOneTodo = async (request, response) => {
    try {
        const { _id } = request.params;

        const todo = await todoModel.findById({_id: _id});

        if (todo) {
            todoModel.update({ _id: _id }, { $set: { isComplete: !todo.isComplete } }, { new: false }, async (err, rs) => {
                if (!err) {
                    return successFunc(response, await todoModel.findById({ _id: _id }));
                } else {
                    return response.status(400)
                        .json({ data: null, error: true, message: err.message })
                }
            })
        } else {
            return response.status(404)
                .json({ data: null, error: false, message: "not found" })
        }
    } catch (error) {
        return errorHandler(response, error)
    }
}

const updateCompleteMultiTodo = (request, response) => {
    try {
        const { isComplete } = request.body;
        if (!isBoolean(isComplete)) {
            return response.status(400)
                .json({ data: null, error: false, message: "bad request" })
        }

        todoModel.update(null, { isComplete: isComplete }, { multi: true }, async (err, rs) => {
            if (!err) {
                return successFunc(response, await todoModel.find());
            } else {
                return response.status(400)
                    .json({ data: null, error: true, message: err.message })
            }
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

const deleteOneTodo = (request, response) => {
    try {
        const { _id } = request.params;

        todoModel.findOne({_id: _id}).remove((err, rs) => {
            if (!err) {
                return successFunc(response, null);
            } else {
                return response.status(400)
                    .json({ data: null, error: true, message: err.message })
            }
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

const clearComplete = (request, response) => {
    try {
        todoModel.find({isComplete: true}).remove((err, rs) => {
            if (!err) {
                return successFunc(response, null);
            } else {
                return response.status(400)
                    .json({ data: null, error: true, message: err.message })
            }
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

module.exports = {
    getAllTodo,
    addTodo,
    updateCompleteOneTodo,
    updateCompleteMultiTodo,
    deleteOneTodo,
    clearComplete
}