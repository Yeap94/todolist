import * as moment from 'moment'

export interface ILogOfTask {
    date: moment.Moment;
    name: string;
    action: string;
    importance: string
}
