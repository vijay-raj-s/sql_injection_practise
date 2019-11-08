import React,{Component} from 'react';
import { loadavg } from 'os';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  });

class Landing extends Component{

    

    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }
    
    componentDidMount(){
        axios.get('http://localhost:3001/users')
          .then(response => {
            debugger;
            this.setState({
                users: response.data.user
            })
          })
          .catch(error => {
            debugger;
            console.log(error);
          });
    }

    render(){
       

        return(
            <div>
            <h1> Welcome back, Admin</h1>
            <Paper >
                <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                             
                            <TableCell align="right">User Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Created Date</TableCell>
                            <TableCell align="right">Admin</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.users.map(row => (
                            <TableRow key={row.user_name}>
                            <TableCell component="th" scope="row">
                                {row.user_name}
                            </TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.reg_date}</TableCell>
                            <TableCell align="right">{row.isAdmin}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </Paper>
            </div>
        )
    }
}

export default Landing;