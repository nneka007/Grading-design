import React, { useState, useEffect } from "react";
import { Table, Tag, message, PageHeader } from "antd";
import axios from "axios";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    let dd = JSON.parse(localStorage.getItem("results"));
    const ddd = dd.map((row) => {
      return {
        key: row.name,
        name: row.name,
        accuracy: row.accuracy,
        functionality: row.functionality,
        points: row.points,
        advise: row.adviceArray,
        email: row.email,
        assignmentName: row.assignmentName,
      };
    });
    setResults(ddd);
  }, []);

  async function sendEmail(obj, isAll = false) {
    const { name, email, advise, assignmentName } = obj;
    const url = "https://grading.citrone.co/sendEmail";
    // const url = "http://localhost:4001/sendEmail";
    axios
      .post(url, {
        name,
        email: email,
        advise,
        assignmentName,
      })
      .then((response) => {
        if (!isAll) {
          message.info("Email sent");
        }
      })
      .catch((error) => console.log("email error", error));
  }

  async function sendAllResult() {
    for (let i = 0; i < results.length; i++) {
      let row = results[i];
      await sendEmail(row, true);
    }
    message.info("Email sent");
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
    },
    {
      title: "Accuracy",
      dataIndex: "accuracy",
      key: "accuracy",
    },
    {
      title: "Functionality",
      dataIndex: "functionality",
      key: "functionality",
    },
    {
      title: "Advise",
      key: "advise",
      dataIndex: "advise",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag style={{ margin: 5 }} color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "email",
      key: "email",
      render: (email, name) => (
        <p onClick={() => sendEmail(name)}>Send result</p>
      ),
    },
  ];
  return (
    <div>
      <PageHeader
        className="site-page-header"
        // onBack={() => null}
        title={`Results for ${results[0]?.assignmentName}`}
        // subTitle="This is a subtitle"
      />
     <div className="flex">
     <button className="ml-auto mr-5 mb-5 p-3 border-2 rounded-md" onClick={() => sendAllResult()}>Send all results</button>
     </div>
      <Table dataSource={results} columns={columns} />
    </div>
  );
}
