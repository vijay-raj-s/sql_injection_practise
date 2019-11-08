import React,{Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    async login(){
        debugger;
        console.log(this.state.email);
        console.log(this.state.password);
        await axios.post('http://localhost:3001/login', {
            email: this.state.email,
            pass: this.state.password,
          })
          .then(  response  => { 
              alert('Login Success');
              this.props.history.push('/landing');
              //window.location.href = window.location.href + 'landing';
          })
          .catch(error => {
            alert('Authentication Failed'); 
            console.log(error);
          });
    }

    render(){


        return(
            <div className='container'>
                <div><h2> Login</h2> </div>
                <div>
                    <div>  
                        <TextField  id="standard-basic" 
                    onChange={e => this.setState({email: e.target.value})}
                    label="email"
                    margin="normal"
                    />  
                    </div>
                    <div>
                    <TextField
                        id="standard-basic" 
                        onChange={e => this.setState({password: e.target.value})}
                        label="password"
                        margin="normal"
                    />  
                   </div>
                    <div>  
                        <Button onClick={this.login.bind(this)} variant="contained" color="primary">
                            Login
                        </Button>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default withRouter( Login);
