import * as moment from 'moment'

export interface ITodoItem {
    position: number,
    date: moment.Moment,
    name: string,
    status: boolean
}