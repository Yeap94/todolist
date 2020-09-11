import * as moment from 'moment'

export interface ITodoItem {
    date: moment.Moment,
    name: string,
    status: boolean
}