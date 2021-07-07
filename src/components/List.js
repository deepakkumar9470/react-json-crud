import React,{useState, useEffect} from 'react'
import {
    Box, makeStyles, Typography, TableContainer,Table,
    TableCell, TableHead,TableRow,Paper, TableBody,Tooltip,IconButton,
    } from '@material-ui/core'
import { orange} from '@material-ui/core/colors'
import VisibilityIcon from '@material-ui/icons/Visibility'
import  EditIcon from '@material-ui/icons/Edit'
import  DeleteIcon from '@material-ui/icons/Delete'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios'

const useStyles = makeStyles({
    stuListColor: {
     backgroundColor: orange[400],
     color: "white"
    }
   })
   
const List = () => {
    const {id} = useParams()
    const classes = useStyles()
    const [stuData, setStuData] = useState([])

    useEffect(() =>{
         const fetchData = async () =>{
              const res = await axios.get(`http://localhost:3333/students`)
              setStuData(res.data)

         }
         fetchData();
    },[]);

   const handleDelete = async (id) =>{
       await axios.delete(`http://localhost:3333/students/${id}`)
       const newstudent = stuData.filter((stu) => stu.id !== id)
       setStuData(newstudent)

   }; 
    return (
        <>
            <Box textAlign="center" className={classes.stuListColor} p={2}>
             <Typography variant="h5">Student List</Typography>
           </Box>
           <TableContainer component={Paper}>
              <Table>
                  <TableHead>
                  <TableRow style={{backgroundColor : '#616161'}}>
                      <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
                      <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
                      <TableCell align="center" className={classes.tableHeadCell}>Position</TableCell>
                      <TableCell align="center" className={classes.tableHeadCell}>Actions</TableCell>
                  </TableRow>
                  </TableHead>

                  <TableBody>
                  {
            stuData.map((student, i) => {
                return (
                        <TableRow key={i}>
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="center">{student.stuname}</TableCell>
                        <TableCell align="center">{student.position}</TableCell>
                        <TableCell align="center">
                        <Tooltip title="View">
                            <IconButton><Link to={`/view/${student.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <IconButton><Link to={`/edit/${student.id}`}><EditIcon /></Link></IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton>
                                <DeleteIcon color="secondary" onClick={()=>handleDelete(student.id)}/>
                            </IconButton>
                        </Tooltip>
                        </TableCell>
                </TableRow>
                )
            })
         }

                     
                  </TableBody>
              </Table>

           </TableContainer>
        </>
    )
}

export default List
