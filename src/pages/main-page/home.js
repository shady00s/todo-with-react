import React from "react";
import TaskBody from "../../components/task-body/task";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-grid.css'

import './home.css'

export default class Home extends React.Component {
    constructor() {
        super();
        this.saveToLocalHost = this.saveToLocalHost.bind(this)
        this.deletetask = this.deletetask.bind(this)
        this.state = {
            body: '',
            createdAt: '',
            status: ''
        }
        this.taskList = []
       this.dataFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))
    }

    // takes the old object from local storage and then return it to new array of objects to be saved in local storage
    localStorageHandeler(arrayMethodName, filterMethods) {
        let oldTask = JSON.parse(localStorage.getItem('tasks'))
        let editedList = []
        let filteredData = []

        for (let index = 0; index < oldTask.length; index++) {
            editedList.push(oldTask[index])

        }
        console.log(editedList)
        switch (arrayMethodName) {
            case "unshift":
                editedList.unshift(this.state)
                localStorage.removeItem('tasks')
                localStorage.setItem('tasks', JSON.stringify(editedList))
                break;

            case "filter":
                filteredData = editedList.filter(filterMethods)
                localStorage.removeItem('tasks')
                localStorage.setItem('tasks', JSON.stringify(filteredData))
                break;

            default:
                break;
        }





    }


    taskValue(event) {
        this.setState({

            body: event.target.value,
            createdAt: new Date(Date.now()).toUTCString(),
            status: 'pending'
        })

    }

    saveToLocalHost() {

        if (this.state.body === '' && this.state.createdAt === '' && this.state.status === '') {
            alert('There is no task please insert one')
        }
        else {
            //check if local storage contains any tasks if there is push new ,if not create new tasks array of object
            if (localStorage.getItem('tasks') === null) {
                this.taskList.push(this.state)

                localStorage.setItem('tasks', JSON.stringify(this.taskList))
            }
            else {
                this.localStorageHandeler("unshift")
                window.location.reload()
            }
        }
        console.log(this.state)

    }
    deletetask(element) {
        window.location.reload()

        window.confirm('Do you want to delete this task?')

        if (window.confirm) {
            let oldLists = JSON.parse(localStorage.getItem('tasks'))
            let deletedList = []
            for (let index = 0; index < oldLists.length; index++) {
                deletedList.push(oldLists[index])
            }
            this.localStorageHandeler('filter', (tasks) => {

                return element.createdAt !== tasks.createdAt
            })

            // let finalList = deletedList.filter((tasks) => {

            //     return element.createdAt !== tasks.createdAt
            // })


            // console.log(finalList)

            // localStorage.removeItem('tasks')
            // localStorage.setItem('tasks', JSON.stringify(finalList))
        }
    }

    archiveTasks(element) {
        

        //console.log(element.status)
        let oldLists = JSON.parse(localStorage.getItem('tasks'))
        let achivedList = []

        oldLists.forEach((element, index) => achivedList.push(element))
        console.log(achivedList)
        let index = achivedList.findIndex(element1 => element1.createdAt === element.createdAt)
        if (achivedList[index].status === 'pending') {
            achivedList[index].status = 'done'
        }
        else{
            achivedList[index].status = 'pending'
        }
        
        window.location.reload()

        localStorage.removeItem('tasks')
        localStorage.setItem('tasks', JSON.stringify(achivedList))

       
    }



    filteringData(filter) {
       // let result = result = JSON.parse(localStorage.getItem('tasks'))
        let editedResult = []
        let alldata =JSON.parse(localStorage.getItem('tasks'))

        for (let index = 0; index < alldata.length; index++) {
            editedResult.push(alldata[index])
            
        }


        if(filter ==="all"){
            console.log(editedResult) 
            window.location.reload()
            this.dataFromLocalStorage = editedResult
        }
        else if(filter === "done"){
           let newArray = editedResult.filter(tasks=> tasks.status === 'done')
            console.log(newArray) 
            window.location.reload()
            this.dataFromLocalStorage = newArray
        }
        
        
        return editedResult
    }


    componentDidMount(){


   
    }
    render() {

        return <div className="mainContainer">
            <div className="titleContainer">
                <h1> To-do app</h1>
                <div className=" m-4 w-50  d-flex justify-content-between align-items-center row">
                    <input value={this.state.textVal} onChange={event => this.taskValue(event)} className=" m-2 form-control col-sm-12 col-lg-7" type="text" placeholder="Write your task" id="inputFeild" />
                    <button onClick={this.saveToLocalHost} className="m-2 btn btn-success col-sm-12 col-lg-4" > <FontAwesomeIcon icon={faPlusSquare} /> Add new task
                    </button>
                </div>
            </div>
            <div className="buttonContainer ">
                <button  className="m-2 btn btn-primary">All Tasks</button>
                <button className="m-2 btn btn-success">Done Tasks</button>
                <button className="m-2 btn btn-danger">Deleted Tasks</button>
            </div>
            <div className="taskContainer">

                {this.dataFromLocalStorage === null || this.dataFromLocalStorage.length === 0 || this.dataFromLocalStorage === undefined ? <h1>No data</h1> : this.dataFromLocalStorage.map((element, i) => {
                    return <TaskBody archivedTask={event => this.archiveTasks(element)} deleteFunc={event => this.deletetask(element)} key={i} element={element} />
                })}



            </div>

        </div>
    }

    // creating task object 






}
