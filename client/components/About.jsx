import React from 'react';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const About = () => (
  <div className="aboutContainer">
    <img className="pivotLogo" src='../assets/images/pivotLogoLarge-1.png' />
    <div>
      <img className="groupPhoto" src='../assets/images/group.jpg' />
    </div>

    <div className="profileContainer" >

      <Card className="profilePhoto" style={{ borderRadius: '8px',   fontFamily: 'HelveticaNeue-UltraLight' }}>
        <CardMedia>
          <img src="../assets/images/carling.jpg" />
        </CardMedia>
        <CardTitle title="Carling Sugarman" style={{ fontWeight: 'bold' }}/>
        <CardActions className="profileIcons">
        <a href="https://github.com/carsugar">
          <img src="../assets/images/github-logo.png" />
        </a>
        <a href="https://www.linkedin.com/in/carling-sugarman-882aa085">
          <img src="../assets/images/linkedin-button.png" />
        </a>
        <a href="https://angel.co/carling-sugarman">
          <img src="../assets/images/angellist-logo.png" />
        </a>
        </CardActions>
      </Card>

      <Card className="profilePhoto" style={{ borderRadius: '8px', fontFamily: 'HelveticaNeue-UltraLight' }}>
        <CardMedia>
          <img src="../assets/images/eugene.jpg" />
        </CardMedia>
        <CardTitle title="Eugene Row" style={{ fontWeight: 'bold' }}/>
        <CardActions className="profileIcons">
          <a href="https://github.com/eugenerow">
            <img src="../assets/images/github-logo.png" />
          </a>
          <a href="https://www.linkedin.com/in/eugenerow">
            <img src="../assets/images/linkedin-button.png" />
          </a>
          <a href="https://angel.co/eugenerow">
            <img src="../assets/images/angellist-logo.png" />
          </a>
        </CardActions>
      </Card>

      <Card className="profilePhoto" style={{ borderRadius: '8px', fontFamily: 'HelveticaNeue-UltraLight' }}>
        <CardMedia>
          <img src="../assets/images/kinjal.jpg" />
        </CardMedia>
        <CardTitle title="Kinjal Chatterjee" style={{ fontWeight: 'bold' }}/>
        <CardActions className="profileIcons">
        <a href="https://github.com/kinjalch">
          <img src="../assets/images/github-logo.png" />
        </a>
        <a href="https://www.linkedin.com/in/kinjalc">
          <img src="../assets/images/linkedin-button.png" />
        </a>
        <a href="https://angel.co/kinjalc">
            <img src="../assets/images/angellist-logo.png" />
        </a>
        </CardActions>
      </Card>
      </div>

      <div>
        <img src="../../assets/images/stack.png" />
      </div>
  </div>
);

export default About;
