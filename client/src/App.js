import React from 'react';
import axios from 'axios';
import './App.css'; 

class App extends React.Component{
  state={
    name:'',
    pass:'',
    dob:'',
    wstate:'yes'
  };
  handleChange=({target}) =>{
    const {name,value}=target;
    this.setState({[name]:value});
  };
  submit=(event)=>{
    event.preventDefault();
    const flymong ={
      name:this.state.name,
      pass:this.state.pass 
    };

    axios({
      url:"http://localhost:8080/api/",
      method:'POST',
      data:flymong
    }).then((response)=>{
      this.setState({wstate:(response.data)});
      console.log("Data is sent :"+response.data);
      // this.resetInputs();
    })
      .catch(()=>{
        console.log("Data is not sent");
      });
  };

  editsubmit=(event)=>{
    event.preventDefault();
    const upmong ={
      pass:this.state.pass,
      dob:this.state.dob
    };

    axios({
      url:"http://localhost:8080/api/update/",
      method:'POST',
      data:upmong
    }).then((response)=>{
      console.log("Data is sent :"+response.data);
      this.resetInputs();
    })
      .catch(()=>{
        console.log("Data is not sent");
      });
  };

  resetInputs=()=>{
    this.setState({
      name:'',
      pass:'Done'
    })
  }
  render(){
    if((this.state.wstate).localeCompare("yes")===0)
    return(
      <div className="centerv">
          <form onSubmit={this.submit}>
                <div className="form-group">
                    <label htmlFor="name">Whats your name bro ?</label>
                    <input type="text" className="form-control" name="name" placeholder="Enter name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">I don't care to know any more than your first name ;)</small>
                </div>
                <div className="form-group">
                    <label htmlFor="pass">Say the magic words</label>
                    <input type="text" className="form-control" name="pass" placeholder="Password"
                          value={this.state.pass}
                          onChange={this.handleChange}
                      />
                    <small id="password" className="form-text text-muted">I open at the close...or with the button below  ¯\_(ツ)_/¯</small>
                </div>
                <button type="submit" className="btn btn-dark">Submit</button>
          </form>
    </div>
    );
    else if((this.state.wstate).localeCompare("proceed")===0){
      return(
      <div className="centerv">
      <form onSubmit={this.editsubmit}>
            <div className="form-group">
                <label htmlFor="name">Enter your dob   </label>
                <input type="date" id="reportdate" name="dob"
                  value={this.state.dob}
                  onChange={this.handleChange}
                />
                <small id="dobhelp" className="form-text text-muted">I won't remember it but the backend sure will o.O</small>
            </div>
            <div className="form-group">
                <label htmlFor="pass">Password please (Enter new if you wish to change)</label>
                <input type="text" className="form-control" name="pass" placeholder="Password"
                      value={this.state.pass}
                      onChange={this.handleChange}
                  />
                <small id="password" className="form-text text-muted">I open at the close...or with the button below  ¯\_(ツ)_/¯</small>
            </div>
            <button type="submit" className="btn btn-dark">Submit</button>
      </form>
      </div>
      );
    }
    else
    return(
      <div className="txt">GTFO</div>
    );
  }
}

export default App;