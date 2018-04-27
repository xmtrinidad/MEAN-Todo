export class Todo {
  title: string;
  items: {id: number, task: string, completed: boolean, edit: boolean}[];
}
