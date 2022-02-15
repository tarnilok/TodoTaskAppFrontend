import React, { useContext, useState } from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import { AuthContext } from "../AuthContext";

const TableTitle = ({ tasksData, order, setOrder, group }) => {
  const { titleName, setTitleName } = useContext(AuthContext);
  const [sortDirection, setSortDirection] = useState("");

  const SortHandler = (e) => {
    const titleToSorted = e.target.className;
    const isStock = titleName.filter(i => !i.includes(group.id))
    isStock === [] ? setTitleName([...titleName, `${titleToSorted}${group.id}`]) : setTitleName([...isStock, `${titleToSorted}${group.id}`])
    
    const newData = [];
    const otherData = [];
    tasksData[0].data?.map((task) => {
      if (task.task_group === group.name) {
        newData.push(task);
      } else {
        otherData.push(task);
      }
    });

    titleToSorted === "due_date"
      ? newData?.sort((a, b) => {
          let x;
          let y;
          order ? (x = new Date(a[`${titleToSorted}`])) : (x = new Date(b[`${titleToSorted}`]));
          order ? (y = new Date(b[`${titleToSorted}`])) : (y = new Date(a[`${titleToSorted}`]));
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        })
      : newData?.sort((a, b) => {
          let x;
          let y;
          order ? (x = a[`${titleToSorted}`]) : (x = b[`${titleToSorted}`]);
          order ? (y = b[`${titleToSorted}`]) : (y = a[`${titleToSorted}`]);

          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
    tasksData[0].data = [...newData, ...otherData];
    setOrder(!order);
    if (sortDirection === "") {
      setSortDirection(true);
    } else {
      sortDirection ? setSortDirection(false) : setSortDirection(true);
    }
  };

  return (
    <>
      <TableHead sx={{ backgroundImage: "linear-gradient(to top, #a3bded 0%, #6991c7 100%)", position: "sticky", top: 0, zIndex: 100, height: "60px" }}>
        <TableRow>
          <TableCell align="left" sx={{ fontSize: "1.2rem", width: "130px" }}>
            <b>
              <code>Group</code>
            </b>
          </TableCell>
          <TableCell align="left" className="parenttitle" sx={{ fontSize: "1.2rem", width: "120px", "&:hover": { cursor: "pointer" } }} onClick={SortHandler}>
            <b>
              <code className="title">Title</code>
            </b>
            {sortDirection !== "" && titleName.includes(`title${group.id}`) ? <ArrowCircleDownTwoToneIcon fontSize="20px" sx={{ color: "red", ml: 1, transform: sortDirection ? null : "rotate(180deg)" }} /> : null}
          </TableCell>
          <TableCell align="left" sx={{ fontSize: "1.2rem", width: "150px" }}>
            <b>
              <code>Description</code>
            </b>
          </TableCell>
          <TableCell align="left" sx={{ fontSize: "1.2rem", width: "100px", "&:hover": { cursor: "pointer" } }} onClick={SortHandler}>
            <b>
              <code className="user">User</code>
            </b>
            {sortDirection !== "" && titleName.includes(`user${group.id}`) ? <ArrowCircleDownTwoToneIcon fontSize="20px" sx={{ color: "red", ml: 1, transform: sortDirection ? null : "rotate(180deg)" }} /> : null}
          </TableCell>
          <TableCell align="left" sx={{ fontSize: "1.2rem", width: "130px", "&:hover": { cursor: "pointer" } }} onClick={SortHandler}>
            <b>
              <code className="priority">Priority</code>
            </b>
            {sortDirection !== "" && titleName.includes(`priority${group.id}`) ? <ArrowCircleDownTwoToneIcon fontSize="20px" sx={{ color: "red", ml: 1, transform: sortDirection ? null : "rotate(180deg)" }} /> : null}
          </TableCell>
          <TableCell align="left" sx={{ fontSize: "1.2rem", width: "100px", "&:hover": { cursor: "pointer" } }} onClick={SortHandler}>
            <b>
              <code className="due_date">DueDate</code>
            </b>
            {sortDirection !== "" && titleName.includes(`due_date${group.id}`) ? <ArrowCircleDownTwoToneIcon fontSize="20px" sx={{ color: "red", ml: 1, transform: sortDirection ? null : "rotate(180deg)" }} /> : null}
          </TableCell>
          <TableCell align="left" sx={{ fontSize: "1.2rem", width: "50px" }}>
            <b>
              <code>IsDone</code>
            </b>
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
    </>
  );
};

export default TableTitle;
