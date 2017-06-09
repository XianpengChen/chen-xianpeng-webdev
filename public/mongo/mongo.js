
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/webdev_summer1_2017');
// mongoose.Promise = require('q').Promise;
//
// todoSchema = mongoose.Schema({
//    title: String,
//     dueDate: Date
// }, {collection: 'todo'});
// todoModel = mongoose.model('todoModel', todoSchema);
//
// todoModel.findAllTodos = findAllTodos;
// todoModel.createTodo = createTodo;
//
// modules.export = todoModel;

// createTodo({title: 'share lecture code', date: new Date()})
//     .then(function (todo) {
//         console.log(todo);
//         return findAllTodos();
//     })
//     .then(function (todos) {
//         console.log(todos);
//     });

function findAllTodos() {
    return todoModel.find()


}

// var todo1 = {
//     title: 'Pick up milk',
//     dueDate: new Date()
// };
//



function createTodo(todo) {
    return todoModel.create(todo);

}
