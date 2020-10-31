import * as angular from 'angular';
import * as _ from 'underscore';
import * as moment from 'moment';
import { ITodoItem } from '../../../models/todoitem';
import { ILogOfTask } from '../../../models/log';
import { products } from '../../shop/components/products';
class TodoController {

    private reverseSort: boolean = false;
    private orderByField: string = 'position';
    private logReverseSort: boolean = true;
    private logOrderByField: string = 'date';
    private newTaskName: string;
    private modalIsOpened = false;
    private taskIndex: number;
    private todoList: Array<ITodoItem> = [];
    private logTask: Array<ILogOfTask> = []; // массив, в который записываются все действия и изменения в todoList
    constructor (
        private $http: ng.IHttpService
    ) {}
    /**
     * @description на ините в массив добавляется дефолтный элемент
     */
    $onInit = (): void => {
        this.todoList.push(
            {
                position: this.todoList.length + 1,
                name: 'Sample',
                date: moment(),
                status: true
            }
        );
    }

    /**
     * @description добавляет новое задание в список заданий
     * По клику на кнопу ADD TASK в разметке запускается данная функция
     * в функцию передается событие. Далее выполняется проверка на приход этого события
     * Если событие пришло И нажата клавиша Enter (property event.key есть в event, которое приходит) ИЛИ событие не пришло, НО при этом имя было введено,
     * и нажата кнопка Add Task, то новое задание добавляется в массив заданий с указанными property (moment() - текущая дата)
     * Также в массив с логом событий тоже добавляется новый элемент
     */
    public addNewTask = (event?: KeyboardEvent, status?: boolean): void => {
        if ((event && event.key === 'Enter' || event === undefined) && this.newTaskName) {
            this.todoList.push({
                position: this.todoList.length + 1,
                name: this.newTaskName,
                date: moment(),
                status: status || false
            });
            this.logTask.push({
                name: this.newTaskName,
                date: moment(),
                action: 'Add',
            });
            this.newTaskName = null;
        }
    }

    /**
     * @description изменяет статус задания на done/undone в списке  по кнопке или чекбоксу
     * также добавляет соответствующий элемент в массив logTask
     * @param task - задание, элемент массива todoList, для которого изменяется статус done/undone
     */
    public changeTaskStatus = (task: ITodoItem): void => {
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
            action: `Status changed on ${changedStatus}`,
        });
    }
    /**
     * @description функция для подтверждения удаления
     * Вызывается при нажатии на кнопку Delete в списке заданий. Открывает модальное окно, в котором можно либо подтвердить, либо отменить удаление
     */
    public agreeDeleteTask = (): void => {
        this.logTask.push({
            name: this.todoList[this.taskIndex].name,
            date: moment(),
            action: 'Delete',
        });
        this.todoList.splice(this.taskIndex, 1);
        this.modalIsOpened = false;
    }
    /**
     * @description удаляет задание из списка и добавляет соответствующий элемент в logTask
     * @param index - индекс задания, на котором была нажата кнопка Delete
     */
    public deleteTask = (index: number): void => {
        this.modalIsOpened = true;
        this.taskIndex = index;
    }

    /**
     * @description функция сортировки значений таблицы по убыванию/возрастанию
     * @param field поле, по которому происходит сортировка. В разметке при вызове функции sortTask передается название столбца, на котором нужна фильтрация
     * @param clear - необязательный параметр, определяющий, нажата ли кнопка Cancel Filters (если данная кнопка нажата, то функция вызывается с двумя параметрами: position, true)
     */
    public sortTask = (field: string, clear?: boolean): void => {
        if (clear || !angular.equals(this.orderByField, field)) {
            this.reverseSort = false;
        } else {
            this.reverseSort = !this.reverseSort;
        }
        this.orderByField = field;
        this.logTask.push({
            name: '--',
            date: moment(),
            action: clear ? 'Cancel sort and filter' : `Sort by ${field}. Reverse: ${this.reverseSort}`,
        });
    }

    /**
     * @description функция очистки лога текущих событий
     */
    public clearLog = (): void => {
        this.logTask.splice(0, this.logTask.length);
    }

    public getTodos = (): void => {
        this.$http.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then((response: angular.IHttpResponse<IFakeApiTodo>) => {
                _.forEach(response.data, (todoItem: IFakeApiTodo) => {
                    this.newTaskName = todoItem.title;
                    this.addNewTask(undefined, todoItem.completed);
                });
            })
            .catch((error: any) => console.log('Error'));
    }
}

interface IFakeApiTodo {
    userId:	number;
    id:	number;
    title: string;
    completed: boolean;
}
export class Todolist implements angular.IComponentOptions {
    public static selector = 'todolist';
    public static controller = TodoController;
    public static controllerAs = 'vm';
    public static template = require('./todolist.component.html');
}
