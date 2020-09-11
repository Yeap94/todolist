import * as angular from 'angular';
import * as _ from 'underscore';
import * as moment from 'moment';
import { ITodoItem } from '../../interface/todoitem.interface';
import { ILogOfTask } from '../../interface/log.interface';

class TodoController {
    private newTaskName: string;
    private todoList: Array<ITodoItem> = [
        {
            name: 'Sample',
            date: moment(),
            status: true
        }
    ];
    private logTask: Array<ILogOfTask> = [];
    // добавление нового задания
    public addNewTask = () => {
        this.todoList.push({
            name: this.newTaskName,
            date: moment(),
            status: false
        });
        this.logTask.push({
            name: this.newTaskName,
            date: moment(),
            action: 'Add'
        });
        this.newTaskName = null;
    }
    // изменение статуса задания
    public changeTaskStatus = (task: ITodoItem) => {
        task.status = !task.status;
        let changedStatus: string;
        if (task.status) {
            changedStatus = 'Done';
        } else {
            changedStatus = 'Undone';
        }
        this.logTask.push({
            name: task.name,
            date: moment(),
            action: `Status changed on ${changedStatus}`
        });
    }
    // удаление задания из списка
    public deleteTask = (index: number) => {
        this.logTask.push({
            name: this.todoList[index].name,
            date: moment(),
            action: 'Delete'
        });
        this.todoList.splice(index, 1);
    }
}

export class Todolist implements angular.IComponentOptions {
    public static selector = 'todolist';
    public static controller = TodoController;
    public static controllerAs = 'vm';
    public static template = require('./todolist.component.html');
}
