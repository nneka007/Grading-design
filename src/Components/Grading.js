import React,{useState, useEffect} from'react'
import axios from'axios'
import './Grading.css'

function Grading() {
    const[enteredCourse,setEnteredCourse]=useState('')
    const[enteredAssignmet,setEnteredAssignment]=useState('')
    const[coursesEntered,setCourcesEntered]=useState('')
    function courseChangeHandler(event){
        setEnteredCourse(event.target.value)
    }
    function assignmentChangeHandler(event){
        setEnteredAssignment(event.target.value)
    }



    useEffect(()=> {
        async function nekiHandler(){
            let webApiUrl= 'https://api.citrone.co/api/course/membercourses'
            let token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIzYzUyMTY4ZDhkN2RmOTYxNjdjMWNmIiwiaWF0IjoxNjUyNDYxNjM3LCJleHAiOjE2NTI1NDgwMzcsImF1ZCI6W3siaWQiOiI2MjNjNTIxNjhkOGQ3ZGY5NjE2N2MxY2YiLCJlbWFpbCI6ImNhcm9saW5lQHN0dXRlcm4uY29tIiwiZmlyc3ROYW1lIjoiQ2Fyb2xpbmUiLCJsYXN0TmFtZSI6Ik53b2dibyJ9XSwiaXNzIjoiY2l0cm9lbi5kZXYifQ.6h_SvxnATk9brkQ0SCmkjL6suRxMeBSz8sdzTcAfUP4'
            const result = await axios.get(webApiUrl,{headers:{"Authorization" :`${token}`}})
            console.log('courses', result.data.allCourses.admin)
            setCourcesEntered(result.data.allCourses.admin)
        }
        nekiHandler()
    }, [])

    async function submitHandler(){
        console.log('Mentor')
    }
    return(
        <div className='container'>
            <div className='cardscreenn'>
                <h2 className='header'>NEW GRADING</h2>
                <div className='course-title'>
                    <label>Course</label>
                    <div>
                       <input value={enteredCourse} onChange={courseChangeHandler}className='course-input' placeholder='Course title'></input>
                    </div>
                </div>
                <div className='course-title'>
                    <label>Assignment</label>
                    <div>
                        <input value={enteredAssignmet} onChange={assignmentChangeHandler} className='course-input' placeholder='Assignment name'></input>
                    </div>
                </div>
                <div>
                    <button onClick={()=>submitHandler()} className='click-button'>Grade Assignment</button>
                </div>
            </div>
        </div>
    );
        
}

export default Grading;