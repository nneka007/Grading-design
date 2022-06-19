import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    let dd = JSON.parse(localStorage.getItem("results"))
    console.log("dddd", dd);
    const ddd = dd.map((row) => {
        return {
            key: row.name,
            name: row.name,
            accuracy: row.accuracy,
            functionality: row.functionality,
            points: row.points,
            advise: row.adviceArray
        }
    })
    setResults(ddd);
  }, []);

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
        title: 'Advise',
        key: 'advise',
        dataIndex: 'advise',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
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
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>Send result</a>,
      },
  ];
  return (
    <div>
      <Table dataSource={results} columns={columns} />
    </div>
  );
}
