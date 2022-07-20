import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons';
import 'bootstrap/dist/css/bootstrap-grid.css'
import React from 'react';
import './task.css'


export default class TaskBody extends React.Component {

    constructor(props) {
        super(props);

        this.state = { clickedEvent: true }
        this.onclickevent = this.onclickevent.bind(this)
    }

    onclickevent() {
        this.props.archivedTask()
        this.setState(clickEvent => ({
            clickedEvent: !clickEvent.clickedEvent
        }))

    }


    render() {

        return <>
            <div className="taskBody row" >
                <div className="taskText col-lg-8 col-sm-12" onClick={this.onclickevent}>

                    {this.state.clickedEvent === true && this.props.element.status ==="pending"? <p >{this.props.element.body}</p> : <p style={{ color: 'grey' }}> <s style={{ color: 'grey' }}>{this.props.element.body}</s> </p>}

                </div>
                {/* delete or edit button */}
                <div className="taskButton col-lg-4 ">
                    <button className='editBtn'><FontAwesomeIcon icon={faEdit}  /> Edit</button>
                    <button onClick={this.props.deleteFunc } className='deletebtn'><FontAwesomeIcon icon={faTrashCan} /> Delete</button>
                </div>
            </div>
        </>
    }
}