import React, {Component} from 'react';
import '../styles/CompleteTasks.scss';
import garbage from '../assets/images/icons8-мусор.svg';

export default class CompleteTasks extends Component{
    constructor(props){
        super(props);
        this.taskName = this.props.taskName;
        this.removeTasks = this.removeTasks.bind(this);
        this.outputLS();
    }

    removeTasks(e){
        let idTask = e.target.parentNode.id;
        console.dir(e.target.parentNode)
        let parentTask = e.target.parentNode;
        let taskValue = parentTask.innerText;

        // deleting an element by id
        this.taskName.splice(idTask, 1);

        this.removeLS(taskValue);

        this.setState({});
    }

    removeLS(taskValue){
        /* Check if tasks exist */
        if (window.localStorage.getItem('tasks')){
            let dataLS = window.localStorage.getItem('tasks');
            // We get the value from LS equal to the element being deleted
            let tasksLS = JSON.parse(dataLS).filter(el => el !== taskValue);
            // Setting a new tasks value
            window.localStorage.setItem('tasks', JSON.stringify(tasksLS));
        }
    }

    outputLS(){
        if (
            this.taskName.length === 0 &&
            Object.entries(window.localStorage).length !== 0
            ) {
            let dataLS = Object.entries(window.localStorage)[0][1];
            JSON.parse(dataLS).forEach(el => {
                this.taskName.push(el);
            })
        }
    }

    render (){
        return (
            <div className='completeTasks tasks'>
                {this.taskName.length !== 0 &&
                    <div>
                        <h3>Complete Tasks</h3>
                    </div>
                }
                <ul>
                    {this.taskName.length !== 0 &&
                    this.taskName.map((el, i)=> {
                        return (
                        <div key={el+i} id={i}>
                            <li>{el}</li>
                            <img src={garbage} alt="" onClick={this.removeTasks} />
                        </div>
                        )
                        })
                    }
                </ul>
            </div>
        )
    }
}