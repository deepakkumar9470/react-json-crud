import React,{useState, useEffect} from 'react'
import {Box,Typography, makeStyles, Grid,TextField, Button} from '@material-ui/core'
import {deepPurple, green, orange} from '@material-ui/core/colors'
import {useParams,useHistory} from 'react-router-dom'
import axios from 'axios'

const useStyles = makeStyles({
    headingColor: {
        backgroundColor : deepPurple[400],
        color : '#fff'
    },
    stuColor: {
        backgroundColor : green[400],
        color : '#fff'
    },
    stuListColor : {
    backgroundColor :orange[400],
    color : '#fff'
    },
    tableHeadCell : {
        color : '#fff',
        fontWeight  : 'bold',
        fontSize : 16

    }

})

const Edit = () => {
    const {id} = useParams()
    const history = useHistory()
    const classes = useStyles()

    const [students, setStudents] = useState({
        stuname : '', position : ''
    })
    
    useEffect(() =>{
        const getData = async () =>{
             const res = await axios.get(`http://localhost:3333/students/${id}`)
             setStudents(res.data)

        }
        getData();
   },[id]);
    const onTextChange = (e) =>{
        setStudents({
            ...students,
            [e.target.name]  : e.target.value
        })
    }
    const formSubmit = async (e) =>{
        e.preventDefault();
        await axios.put(`http://localhost:3333/students/${id}`,students)
        history.push('/')
    };
    

    return (
        <>
        <Box textAlign="center" className={classes.headingColor} p={2} mb={3}>
             <Typography variant="h3">React JSON Crud</Typography>
        </Box>
        <Grid container justifyContent="center" spacing={3}>
              <Grid item md={6} xs={12}>
                <Box textAlign="center" className={classes.stuColor} p={2} mb={2}>
                  <Typography variant="h4">Edit Details</Typography>
                 </Box>
                 <form noValidate ml={3} onSubmit={formSubmit}>
                     <Grid container spacing={2}>
                     <Grid item xs={12} sm={6}>
                            <TextField autoComplete="id" name="id" variant="outlined"
                            required fullWidth id="stuid" label="Name" value={id} disabled/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete="stuname" name="stuname" variant="outlined"
                            required fullWidth id="stuname" label="Name" value={students.stuname}
                            onChange={(e)=>onTextChange(e)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField autoComplete="position" name="position" variant="outlined"
                            required fullWidth id="position" label="Position" value={students.position}
                            onChange={(e)=>onTextChange(e)}/>
                        </Grid>
                     </Grid>

                     <Box m={3}>
                         <Button 
                             type="submit" 
                             variant="contained" 
                             color="primary" 
                             fullWidth>Edit</Button>
                     </Box>
                     
                 </form>
                 <Box m={3} textAlign="center">
                   <Button color='primary' variant='contained'>Go back</Button>
                 </Box>
                  
              </Grid>
        </Grid>
        </>
    )
}

export default Edit
