import React,{useState, useEffect} from 'react'
import {Box, Typography, makeStyles, TableContainer,Table,
    TableCell, TableHead,TableRow,Paper, TableBody,Tooltip, Button,IconButton,
    } from '@material-ui/core'
import { orange} from '@material-ui/core/colors'
import  EditIcon from '@material-ui/icons/Edit'
import  DeleteIcon from '@material-ui/icons/Delete'
import {Link,useParams,useHistory} from 'react-router-dom'
import axios from 'axios'

const useStyles = makeStyles({
    stuListColor: {
     backgroundColor: orange[400],
     color: "white"
    },
    tableHeadCell: {
     color: "white",
     fontWeight: "bold",
     fontSize: 16
    },
   })
   
const View = () => {
    const {id} = useParams()
    const classes = useStyles()
    const history = useHistory()
    const [stuData, setStuData] = useState([])
    useEffect(() =>{
        const getData = async () =>{
             const res = await axios.get(`http://localhost:3333/students/${id}`)
             console.log(res.data)
             setStuData(res.data)

        }
        getData();
   },[id]);

   const backHandler = () =>{
       history.push('/')
   }

    return (
        <>
            <Box textAlign="center" className={classes.stuListColor} p={2}>
             <Typography variant="h5">Student Details</Typography>
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
                     <TableRow>
                         <TableCell align="center">{stuData.id}</TableCell>
                         <TableCell align="center">{stuData.stuname}</TableCell>
                         <TableCell align="center">{stuData.position}</TableCell>
                         <TableCell align="center">
                             <Tooltip title='edit'>
                                 <IconButton>
                                     <Link to={`/edit/${id}`}><EditIcon color="primary"/></Link>
                                  </IconButton>
                             </Tooltip>
                             <Tooltip title='delete'>
                                 <IconButton>
                                     <Link to='/'><DeleteIcon color="warning"/></Link>
                                  </IconButton>
                             </Tooltip>
                         </TableCell>
                     </TableRow>
                  </TableBody>
              </Table>

           </TableContainer>
           <Box m={3} textAlign="center">
               <Button color='primary' variant='contained' 
               onClick={backHandler}>Go back</Button>
           </Box>
        </>
    )
}

export default View
