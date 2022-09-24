import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoList } from 'src/models/todoList.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  public todoList: TodoList [] = [];
  public title: String = 'Lista de Tarefas';
  public form: FormGroup;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['',Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  add(){
    //this.form.value => {title: 'Titulo'}
    const title = this.form.controls['title'].value;
    const id =this.todoList.length + 1;
    this.todoList.push(new TodoList(id, title, false));
    this.save();
    this.clear();
  }

  clear(){
    this.form.reset();
  }
  remove(todoList: TodoList){
    const index = this.todoList.indexOf(todoList);

    if(index !== -1){
      this.todoList.splice(index, 1);      
    }
    this.save();
  }

  markAsDone(todoList: TodoList){
    todoList.done = true;
    this.save();
  }

  markAsUndone(todoList: TodoList){
    todoList.done =false;
    this.save();
  }

  save(){
    const data = JSON.stringify(this.todoList);
    localStorage.setItem('todoList', data);
    this.mode='list';
  }

  load(){
    const data = localStorage.getItem('todoList');
    if(data){
      this.todoList = JSON.parse(data);
    }else{
      this.todoList = [];
    }
  }

  changeMode(mode: string){
    this.mode = mode;
  }
}
