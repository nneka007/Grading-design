import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import "./Grading.css";

function Grading() {
  let navigate = useNavigate();
  const [enteredCourse, setEnteredCourse] = useState("");
  const [enteredAssignmet, setEnteredAssignment] = useState("");
  const [coursesEntered, setCourcesEntered] = useState("");
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [loading, toggleLoading] = useState(false);
  const [isJavaScript, setIsJavaScript] = useState(false);

  function courseChangeHandler(event) {
    setEnteredCourse(event.target.value);
  }
  function assignmentChangeHandler(event) {
    setEnteredAssignment(event.target.value);
  }

  useEffect(() => {
    async function nekiHandler() {
      let token = localStorage.getItem("token");
      let webApiUrl = "https://api.citrone.co/api/course/membercourses";
      // let token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIzYzUyMTY4ZDhkN2RmOTYxNjdjMWNmIiwiaWF0IjoxNjUyNDYxNjM3LCJleHAiOjE2NTI1NDgwMzcsImF1ZCI6W3siaWQiOiI2MjNjNTIxNjhkOGQ3ZGY5NjE2N2MxY2YiLCJlbWFpbCI6ImNhcm9saW5lQHN0dXRlcm4uY29tIiwiZmlyc3ROYW1lIjoiQ2Fyb2xpbmUiLCJsYXN0TmFtZSI6Ik53b2dibyJ9XSwiaXNzIjoiY2l0cm9lbi5kZXYifQ.6h_SvxnATk9brkQ0SCmkjL6suRxMeBSz8sdzTcAfUP4'
      const result = await axios.get(webApiUrl, {
        headers: { Authorization: `${token}` },
      });
      let allData = result.data.allCourses.admin || [];
      let courseIds = allData.map((item) => {
        return {
          name: item.course.title,
          id: item.course._id,
        };
      });
      setCourses(courseIds);
      setCourcesEntered(result.data.allCourses.admin);
    }
    nekiHandler();
  }, []);

  async function onSelectChange(event) {
    setLessons([]);
    let token = localStorage.getItem("token");
    let result = await axios.post(
      "https://api.citrone.co/api/lesson/all/lessons",
      {
        course: event.target.value,
      },
      { headers: { Authorization: `${token}` } }
    );
    const lessons = result.data.lessons;
    let mappedLessons = lessons.map((lesson) => {
      return {
        name: lesson.lesson.title,
        id: lesson.lesson._id,
      };
    });
    setLessons(mappedLessons);
  }

  async function onLessonSelectChange(event) {
    setSelectedLesson(event.target.value);
    setAssignments([]);
    let token = localStorage.getItem("token");
    let result = await axios.get(
      `https://api.citrone.co/api/assignment/lesson/${event.target.value}`,
      { headers: { Authorization: `${token}` } }
    );
    const assignments = result.data.assignment;
    let mappedAassignments = assignments.map((assignment, index) => {
      return {
        name: assignment.title,
        id: assignment._id,
      };
    });
    if (mappedAassignments.length === 1) {
      setAssignments([
        {
          name: mappedAassignments[0].name,
          id: mappedAassignments[0].id,
        },
      ]);
      setSelectedAssignment(mappedAassignments[0].id);
    } else {
      setAssignments(mappedAassignments);
    }
  }

  async function onAssignmentSelectChange(event) {
    setSelectedAssignment(event.target.value);
  }

  function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
  }

  async function submitHandler() {
    toggleLoading(true);
    const assignmentobject = assignments.find(
      (x) => x.id === selectedAssignment
    );
    let token = localStorage.getItem("token");
    let result = await axios.get(
      `https://api.citrone.co/api/assignment/all-answers/${selectedAssignment}`,
      { headers: { Authorization: `${token}` } }
    );
    const assignmentss = result.data.assignment;
    let allAnswers = assignmentss.map((item) => {
      return {
        link: item.answer,
        name: `${item.createdBy.firstName} ${item.createdBy.lastName}`,
        email: item.createdBy.email,
        id: item._id,
      };
    });
    const url = "https://grading.citrone.co/gradeassignment";
    const assignmentName = replaceAll(assignmentobject.name, " ", "_");
    // const url = "http://localhost:4001/gradeassignment";
    await axios
      .post(url, {
        assignments: allAnswers,
        type: replaceAll(assignmentName, "-", "_"),
        isJavaScript: isJavaScript,
      })
      .then((res) => {
        if (res.data === "No assignment script yet") {
          toggleLoading(false);
          alert("No assignment script for this yet");
        } else {
          toggleLoading(false);
          localStorage.setItem("results", JSON.stringify(res.data));
          navigate("/results");
        }
      })
      .catch((err) => {
        toggleLoading(false);
        alert("error while grading assignment");
      });
  }
  const onChange = (e) => {
    setIsJavaScript(e.target.checked);
  };
  return (
    <div className="flex flex-row h-screen">
      <div style={{ backgroundColor: "#000E3C" }} className="w-1/2">
        <h1 className="text-4xl text-white font-bold m-10">Stutern</h1>
      </div>
      {/** RIGHT SIDE BEGINS NOW */}
      <div className="flex justify-center items-center h-screen w-1/2 bg-white w-full">
        <div className="">
          <h2 className="text-3xl font-bold">New Grading</h2>
          <h6>
            Select the assignment to grade below. It will be graded
            automatically
          </h6>
          <h6>
            {" "}
            and the results shared with all the students that met the submission
            criteria.
          </h6>
          <div className="mt-10">
            <label>Course</label>
            <div>
              <select
                onChange={onSelectChange}
                className="p-3 border-2 rouded-md"
              >
                <option>Select course</option>
                {courses.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <label>Lessons</label>
            <div>
              {/* <input value={enteredAssignmet} onChange={assignmentChangeHandler} className='course-input' placeholder='Assignment name'></input> */}
              <select
                onChange={onLessonSelectChange}
                className="p-3 border-2 rouded-md w-48"
              >
                <option>Select lesson</option>
                {lessons.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <label>Assignments</label>
            <div>
              <select
                id="assignment"
                onChange={onAssignmentSelectChange}
                value={selectedAssignment}
                className="p-3 border-2 rouded-md w-48"
              >
                <option>Select assignment</option>
                {assignments.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <Checkbox style={{ marginTop: 20 }} onChange={onChange}>
            Is this a JavaScript assignment ?
          </Checkbox>
          <div>
            {loading ? (
              <div className="mt-6">
                <Spin />
                <p>Grading assignment.....Please wait</p>
              </div>
            ) : (
              <button
                onClick={() => submitHandler()}
                className="border-2 rounded-md py-5 px-10 mt-5"
              >
                Grade Assignment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grading;
