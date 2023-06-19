import axios from "axios";
import { useState,useEffect } from "react";
// MUI --------------
import {Table,Stack, Button} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { DeleteTwoTone } from "@ant-design/icons";
import { EditFilled } from "@ant-design/icons";
import { Input, Modal } from 'antd';


function App() {

const [userData,setUserData]=useState([])
const [skip,setSkip]=useState(0)
const [limit,setLimit]=useState(10)
const [user,setUser]=useState(null)
const [modal1Open,setModal1Open]=useState(false)
const table=document.getElementById("table")
const [modal2Open,setModal2Open]=useState(false)
const [newUser,setNewUser]=useState(
  {firstName:" ",
  lastName:" ",
  age:" "}
)


useEffect(() => {
  
const callApi=async()=>{
  const response =await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
  setUserData(response.data.users)
  console.log(userData)
}
  callApi()
  // eslint-disable-next-line
}, [skip,limit])



const handleChangePage=(event,value)=>{
console.log(event,value)
setSkip(value*limit)
}

const handleChangeRowsPerPage=(event)=>{
  console.log(event)
  setLimit(event.target.value)
}

const updateUser=(usr)=>{
setModal1Open(true)
setUser(usr)
table.style.filter="blur(2px)"
}

const setModal1close=()=>{
  setModal1Open(false)
  setModal2Open(false)
  table.style.filter="none"
}

const updateuserData=(e,entity)=>{
  setUser({...user,[entity]:e.target.value})
}

const updateApi=async()=>{
  const response =await axios.put(`https://dummyjson.com/users/${user.id}`,user)
  setUser(response.data)
  console.log(response.data)
}

const deleteUser=(usr)=>{
const deleteAPI=async()=>{
  const response=await axios.delete(`https://dummyjson.com/users/${usr.id}`)
  console.log(response.data)
}
deleteAPI()
}

const addUser=()=>{
setModal2Open(true)
table.style.filter="blur(2px)"
}

const addAPI=async()=>{
  const response = await axios.post(`https://dummyjson.com/users/add`,newUser)
  console.log(response.data)
}

const addUserData=(e,entity)=>{
  setNewUser({...newUser,[entity]:e.target.value})
}

console.log(user)

  return (
<div id="table">
<TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.lastName}</TableCell>
              <TableCell align="center">{row.age}</TableCell>
              <TableCell align="center">
                <Stack spacing={4} direction={"row"}  className="d-flex justify-content-center">
                <DeleteTwoTone onClick={()=>deleteUser(row)}/>
                <EditFilled onClick={()=>updateUser(row)}/>
                </Stack>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
  component="div"
  count={100}
  page={skip/limit}
  onPageChange={(e,page)=>handleChangePage(e,page)}
  rowsPerPage={limit}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>

<Modal
        title={`${user?.firstName}'s Profile`}
        centered
        open={modal1Open}
        onOk={()=>updateApi()}
        onCancel={setModal1close}
        okText="Update"
      >
        <div className="d-flex justify-content-center mb-3 align-items-center">

<img src={ user?.image} height={"250px"} alt="user"/>
        </div>
        <Stack spacing={2}>
       <Input addonBefore="First Name :" value={user?.firstName} onChange={(e)=>updateuserData(e,"firstName")}/>
       <Input addonBefore="Last Name :" value={user?.lastName} onChange={(e)=>updateuserData(e,"lastName")}/>
       <Input addonBefore="Age :" value={user?.age} onChange={(e)=>updateuserData(e,"age")}/>
        </Stack>
      </Modal>


<Modal
        title="Add User"
        centered
        open={modal2Open}
        onOk={addAPI}
        onCancel={setModal1close}
        okText="Add"
      >

        <Stack spacing={2}>
       <Input addonBefore="First Name :"  onChange={(e)=>addUserData(e,"firstName")}/>
       <Input addonBefore="Last Name :"  onChange={(e)=>addUserData(e,"lastName")}/>
       <Input addonBefore="Age :"  onChange={(e)=>addUserData(e,"age")}/>
        </Stack>
      </Modal>


<div className="d-flex justify-content-center">

     <Button onClick={addUser}>
     Create User 
     </Button> 
</div>

    </div>
    );
}

export default App;


