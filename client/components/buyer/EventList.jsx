import React from 'react';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import EventListItem from './EventListItem.jsx';
import Maps from '../Maps.jsx';

// class EventList extends React.Component {
//   renderEventList() {
//     //console.log("inside event list:", this.props);
//     return this.props.events.map((event, idx) =>
//       <EventListItem key={idx} event={event} />
//     );
//   }
//
//   render() {
//     if (!this.props.events) {
//       return (
//         <div>No events match this search.</div>
//       );
//     }
//
//     return (
//       <div className="list">
//         { this.renderEventList() }
//       </div>
//     );
//   }
// }
//
// function mapStateToProps(state) {
//   return {
//     events: state.events,
//   };
// }
//
// export default connect(mapStateToProps)(EventList);
//

class EventList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };

  this.handleChange = this.handleChange.bind(this);
  }

  renderEventList() {
    if (this.props.events.length) {
      return (
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="Events" value="a" >
            <div className="list">
            {this.props.events.map((event, idx) => {return <EventListItem key={idx} event={event} />})}
            </div>
          </Tab>
          <Tab label="Map" value="b">
            <div className="map">
              <Maps />
            </div>
          </Tab>
        </Tabs>
      );
    } else {
      return (
        <div>No events match this search.</div>
      );
    }
    }

  handleChange(value) {
    this.setState({
      value: value,
    });
  }

  // componentWillMount() {
  //   if (this.props.events.length === 0) {
  //     // render() {
  //       return (
  //         <div></div>
  //       );
  //     // }
  //   }
  // }

  render() {
    // if (this.props.events.length) {
      return (
        <div className="list">
        { this.renderEventList() }
        </div>
      );
    }

      // return (
      //   <div>No events match this search.</div>
      // );

}

function mapStateToProps(state) {
  return {
    events: state.events,
  };
}

export default connect(mapStateToProps)(EventList);

// renderEventList() {
//     //console.log("inside event list:", this.props);
//     return this.props.events.map((event, idx) =>
//       <EventListItem key={idx} event={event} />
//     );
//   }
//
//   render() {
//     if (!this.props.events) {
//       return (
//         <div>No events match this search.</div>
//       );
//     }
//
//     return (
//       <div className="list">
//         { this.renderEventList() }
//       </div>
//     );
//   }
// }
//
// function mapStateToProps(state) {
//   return {
//     events: state.events,
//   };
// }
//
// export default connect(mapStateToProps)(EventList);
