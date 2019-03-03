import React from 'react';
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap';
import NavBar from './NavBar';
import './App.css';
import axios from 'axios';

export default class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      data : []
    }

    this.orderBtn = this.orderBtn.bind(this);
  }

  componentDidMount(){
    fetch('/api/showData').then((result) => {
      result.json().then((data) => {
        this.setState({
          data : data
        })
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  orderBtn(id){
    axios.post(`/api/orderData/${id}`);
  }

  render(){
    return(
      <div>
        <NavBar />

        <div className="title">
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">Let's Shaving</h1>
              <p className="lead">Our products will make you prefect to meet perfect woman</p>
            </Container>
          </Jumbotron>
        </div>

        <div className="prodList">
          <Container>
            <Row>
              {this.state.data.map((el) => {
                return(
                  <Col xl="4" lg="4" md="12" sm="12" xs="12">
                    {el.images.map((el2) => {
                      return(
                        <div>
                          <img src={el2.src} alt="pic" style={{width:"300px", height:"300px"}} />
                        </div>
                      )
                    })}
                    <br/>
                    <div className="name">
                      {el.title}
                    </div>
                    <br/>
                    {el.variants.map((el2) => {
                      return(
                        <div>
                          <span className="firstPrice">
                            {el2.price} 
                          </span>
                          &nbsp;&nbsp;<i class="fas fa-arrow-right"></i>&nbsp;&nbsp;
                          <span className="secondPrice">
                            {el2.price * 0.75}
                          </span>
                          <br/><br/>
                          <Button outline color="info" onClick={() => this.orderBtn(el2.id)}>Buy</Button>
                        </div>
                      )
                    })}
                  </Col>
                )
              })}
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}