import React,{useState, useEffect} from 'react'
import {Box, Typography, makeStyles, Grid,TextField, Button,IconButton,} from '@material-ui/core'
import {deepPurple} from '@material-ui/core/colors'
import List from './List'
import axios from 'axios'
const useStyles = makeStyles({
    headingColor: {
        backgroundColor : deepPurple[400],
        color : '#fff'
    },
    

})


const Home = () => {
    const classes = useStyles()

    const [students, setStudents] = useState({
        stuname : '', position : ''
    })
    const [status, setStatus]  = useState(false)

    const onTextChange = (e) =>{
        setStudents({
            ...students,
            [e.target.name]  : e.target.value
        })
    }
    const formSubmit = async (e) =>{
        e.preventDefault();
        const newstudent = await axios.post('http://localhost:3333/students',students)
        setStatus(true)
        console.log(newstudent)
    };
    

    if (status) {
        return <Home/>
    }
    return (
        <>
        <Box textAlign="center" className={classes.headingColor} p={2} mb={3}>
             <Typography variant="h3">React JSON Crud</Typography>
        </Box>
        <Grid container justifyContent="center" spacing={3}>
              <Grid item md={6} xs={12}>
                <Box textAlign="center" className={classes.stuColor} p={2} mb={2}>
                  <Typography variant="h4">Student Form</Typography>
                 </Box>
                 <form noValidate ml={3} onSubmit={formSubmit}>
                     <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField autoComplete="stuname" name="stuname" variant="outlined"
                            required fullWidth id="stuname" label="Name"
                            onChange={(e)=>onTextChange(e)}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField autoComplete="position" name="position" variant="outlined"
                            required fullWidth id="position" label="Position"
                            onChange={(e)=>onTextChange(e)}/>
                        </Grid>
                     </Grid>

                     <Box m={3}>
                         <Button 
                             type="submit" 
                             variant="contained" 
                             color="primary" 
                             fullWidth>Add</Button>
                     </Box>
                 </form>
                  
              </Grid>
              
              <Grid item md={6} xs={12}>
                  <List/>
              </Grid>
        </Grid>
        </>
    )
}

export default Home
