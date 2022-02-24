import React, { useEffect, useContext, useState } from "react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import DoneIcon from "@mui/icons-material/Done";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SaveIcon from "@mui/icons-material/Save";
import InputLabel from "@mui/material/InputLabel";
import { successToastify, errorToastify } from "../toastify";
import { ConnectApi, CrudApi} from "../api/ConnectApi";
import { AuthContext } from "../AuthContext";
import TableTitle from "./TableTitle";
import DoneTasks from "./DoneTasks";
// import axios from "axios";

const Main = () => {
  const { loading, currentUser } = useContext(AuthContext);
  const [catcher, setCatcher] = useState([]);
  const [changeHandler, setChangeHandler] = useState(false);
  const [order, setOrder] = useState(false);
  const [data, setData] = useState([]);
  // console.log(data);

  const priorityList = ["high priority", "medium priority", "low priority", "no priority"];
  const sortTitles = ["title/asc", "title/desc", "user/asc", "user/desc", "priority/asc", "priority/desc", "due_date/asc", "due_date/desc"];

  const GROUP_API_URL = "https://dj-react-todotaskapp-backend.herokuapp.com/groups";
  const USER_API_URL = "https://dj-react-todotaskapp-backend.herokuapp.com/usernames";
  const TASK_API_URL = "https://dj-react-todotaskapp-backend.herokuapp.com/tasks";

  let groupsData = ConnectApi(GROUP_API_URL, changeHandler);
  let tasksData = ConnectApi(TASK_API_URL, changeHandler);
  let usersData = ConnectApi(USER_API_URL);
  // console.log(usersData)

//   const Please = async (group) => {
//     // useEffect(() => {
//     // const abc = async () => {
//     const list = group.order.split("/");
//     let type;
//     list[1] === "asc" ? (type = list[0]) : (type = "-" + list[0]);
//     const TASK_API_URL_SORT = "http://127.0.0.1:8000/tasks/" + `?task_group=${group.id}&ordering=${type}`;
//     try {
//       let datas = await axios.get(TASK_API_URL_SORT);
//       // console.log('jfdklşa', datas)
// //       data?.map(i => {
// // i?.data?.map(j => {
// //   if(j.task_group !== group.name) data.push(datas)
// //       })
// //     })
//       data.push(datas)
//       // data[0] = Array.from(new Set(data[0]))
//       // data[0]?.data?.map(i => {
//       //   if(i?.task_group !== group?.name) data[0] = datas
//       // })
//       // console.log(data)
//     } catch (error) {
//       console.log(error);
//     }
//     // };
//     // abc();
//     // }, []);
//   };

  const SetCatcherHandler = (e, id) => {
    const { checked, name, value } = e.target;

    const list = tasksData[0].data.filter((lst) => lst.id === id);

    name === "due_date" ? (list[0][`${name}`] = value) : (list[0][`${name}`] = checked ?? value);
    if (name === "user") {
      usersData[0].data.map((user) => {
        if (user.username === value) list[0].user_id = user.id;
      });
    }
    if (name === "task_group") {
      groupsData[0].data.map((group) => {
        if (group.name === value) list[0].task_group_id = group.id;
      });
    }
    setCatcher(list[0]);
  };

  const UpdateAppTodo = (e) => {
    e.preventDefault();
    console.log(catcher);
    try {
      CrudApi(TASK_API_URL + catcher.id + "/", catcher, currentUser.data.key, "put", catcher);
      successToastify("Updated successfully");
    } catch (error) {
      errorToastify("Something went wrong, try again!");
    }
    setChangeHandler(!changeHandler);
  };

  const HandleAdd = (e, group_id) => {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const today = year + "-" + month + 1 + "-" + day;

    const NewRow = { title: "", description: "", due_date: today, is_completed: false, priority: "no priority", task_group_id: group_id, user_id: currentUser.data.user.id };
    try {
      CrudApi(TASK_API_URL, NewRow, currentUser.data.key, "post");
      successToastify("New row created successfully");
    } catch (error) {
      errorToastify("Something went wrong, try again!");
    }
    setChangeHandler(!changeHandler);
  };

  const HandleDelete = (e, task_id) => {
    if (window.confirm("Are you sure to delete this task ?")) {
      try {
        CrudApi(TASK_API_URL + task_id + "/", "", currentUser.data.key, "delete");
        successToastify("The row deleted successfully");
      } catch (error) {
        errorToastify("Something went wrong, try again!");
      }
    }
    setChangeHandler(!changeHandler);
  };

  const HandleGroupDelete = (e, group_id) => {
    if (window.confirm("Are you sure to delete this group list ?")) {
      try {
        CrudApi(GROUP_API_URL + group_id + "/", "", currentUser.data.key, "delete");
        successToastify("The group list deleted successfully");
      } catch (error) {
        errorToastify("Something went wrong, try again!");
      }
    }
    setChangeHandler(!changeHandler);
  };

  const SortHandler = (e, group_id, group_name) => {
    const orderType = { name: group_name, order: e.target.value };
    try {
      CrudApi(GROUP_API_URL + group_id + "/", orderType, currentUser.data.key, "put");
      successToastify("The sort type at DB has been changed successfully");
    } catch (error) {
      errorToastify("Something went wrong, try again!");
    }
    setChangeHandler(!changeHandler);
  };

  const HandleAddGroup = (e) => {
    e.preventDefault();
    const new_group_list = { name: e.target.new_group.value };
    e.target.new_group.value = ""
    try {
      CrudApi(GROUP_API_URL, new_group_list, currentUser.data.key, "post", catcher);
      successToastify("New group list added successfully");
    } catch (error) {
      errorToastify("Something went wrong, try again!");
    }
    setChangeHandler(!changeHandler);
  };

  return (
    <Box sx={{ width: "100%", minHeight: "93.4vh", position: "absolute", display: "flex", flexDirection: "column", alignItems: "start", backgroundImage: 'url("https://picsum.photos/1600/900")', backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
      {currentUser ? (
        loading ? (
          <Stack sx={{ display: "flex", justifyContent: "center", mt: "50px", width: "100%" }} direction="row">
            <CircularProgress color="success" size="7rem" />
          </Stack>
        ) : (
          groupsData[0].data?.map((group) => {
            // {
            //   Please(group);
            // }
            return (
              <Box key={group?.id} sx={{ display: "flex", width: "100%", justifyContent: "space-between", "@media(max-width: 1200px)": { flexDirection: "column" } }}>
                <Box component="form" onSubmit={(e) => UpdateAppTodo(e)} sx={{ m: 4, p: 1, backgroundImage: "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)", height: "0" }}>
                  <Box sx={{ display: "flex", m: 0, p: 0 }}>
                    <Button align="right" onClick={(e) => HandleGroupDelete(e, group?.id)}>
                      <DeleteIcon />
                    </Button>
                    <FormControl variant="standard" sx={{ width: "140px", mb: 1.5 }} size="small">
                      <InputLabel sx={{ color: "#1976D2" }}>
                        <b>SortAtDB</b>
                      </InputLabel>
                      <Select sx={{ mr: 1 }} defaultValue={group?.order} onChange={(e) => SortHandler(e, group?.id, group?.name)}>
                        {sortTitles.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <Typography sx={{ color: "red", flex: 1, fontSize: "1.7rem", textAlign: "center", mt: 1.2 }}>
                      <code>{`──── <${group?.name}/> ────`}</code>
                    </Typography>

                    <Button onClick={(e) => HandleAdd(e, group?.id)}>
                      <AddBoxIcon />
                      ADD
                    </Button>
                    <Button type="submit" align="right">
                      <DoneIcon />
                      SAVE
                    </Button>
                  </Box>
                  <hr />
                  <TableContainer component={Paper} sx={{ maxHeight: "400px" }}>
                    <Table>
                      <TableTitle tasksData={tasksData} order={order} setOrder={setOrder} group={group} />
                      <TableBody>
                        {tasksData[0]?.data?.map((task) => {
                          if (task.is_completed === false && task.task_group === group.name) {
                            return (
                              <TableRow key={task.id}>
                                <TableCell sx={{ m: 0, p: 1 }}>
                                  <FormControl variant="standard" sx={{ m: 1, width: "130px" }} size="small">
                                    <Select defaultValue={group?.name} name="task_group" onChange={(e) => SetCatcherHandler(e, task.id)}>
                                      {groupsData[0].data.map((grp, index) => {
                                        return (
                                          <MenuItem key={index} value={grp?.name}>
                                            {grp?.name}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                </TableCell>
                                <TableCell sx={{ m: 0, p: 1 }}>
                                  <TextField defaultValue={task.title} size="small" multiline name="title" onChange={(e) => SetCatcherHandler(e, task.id)} variant="standard" sx={{ width: "130px", m:1 }} />
                                </TableCell>
                                <TableCell align="left" sx={{ m: 0, p: 1 }}>
                                  <TextField defaultValue={task.description} multiline name="description" onChange={(e) => SetCatcherHandler(e, task.id)} size="small" variant="standard" sx={{ width: "175px", m: 1 }} />
                                </TableCell>
                                <TableCell align="left" sx={{ m: 0, p: 1}}>
                                  <FormControl variant="standard" sx={{ m: 1 , width: "90px" }} size="small">
                                    <Select value={task?.user ?? ""} name="user" onChange={(e) => SetCatcherHandler(e, task.id)}>
                                      {usersData[0].data?.map((user) => {
                                        return (
                                          <MenuItem key={user?.id} value={user.username}>
                                            {user.username}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                </TableCell>
                                <TableCell align="center" sx={{ m: 0, p: 1 }}>
                                  <FormControl variant="standard" sx={{ mr: 1, width: "130px" }} size="small">
                                    <Select defaultValue={task.priority} name="priority" onChange={(e) => SetCatcherHandler(e, task.id)} sx={{ mr: 2 }}>
                                      {priorityList.map((item, index) => {
                                        return (
                                          <MenuItem key={index} value={item}>
                                            {item}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                </TableCell>
                                <TableCell align="center" sx={{ m: 0, p: 1 }}>
                                  <input type="date" style={{ height: "35px", fontSize: "16px", textAlign: "center", width: "141px", borderWidth: "0 0 1px", outline: 0 }} name="due_date" defaultValue={task.due_date} onChange={(e) => SetCatcherHandler(e, task.id)} />
                                </TableCell>
                                <TableCell align="center" sx={{ m: 0, p: 0 }}>
                                  <Checkbox name="is_completed" sx={{ textAlign: "center" }} checked={task.is_completed ? true : false} onChange={(e) => SetCatcherHandler(e, task.id)} />
                                </TableCell>
                                <TableCell align="center" sx={{ m: 0, p: 0 }}>
                                  <IconButton edge="start" onClick={(e) => HandleDelete(e, task.id)}>
                                    <ClearIcon sx={{ color: "#1976D2" }} />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            );
                          }
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box>
                  <DoneTasks group={group} tasksData={tasksData} UpdateAppTodo={UpdateAppTodo} SetCatcherHandler={SetCatcherHandler} />
                </Box>
              </Box>
            );
          })
        )
      ) : null}
      <Box component="form" onSubmit={HandleAddGroup} sx={{ m: 4, p: 1, backgroundImage: "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)", maxWidth: "340px" }}>
        <Box component={Paper} p={1}>
          <TextField size="small" name="new_group" placeholder="Add New Group List" />
          <Button type="submit" align="right" size="large" sx={{ marginLeft: 1 }}>
            <SaveIcon />
            SAVE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default Main;
