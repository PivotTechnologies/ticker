import React from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
// import {GridList, GridTile} from 'material-ui/GridList';
// import IconButton from 'material-ui/IconButton';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { searchEvents } from '../../actions/index';



class SellerConfirmation extends React.Component {


// const CardExampleWithAvatar = () => (
  // <Card>
  //   <CardHeader
  //     title="URL Avatar"
  //     subtitle="Subtitle"
  //     avatar="images/jsa-128.jpg"
  //   />
  //   <CardMedia
  //     overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
  //   >
  //     <img src="images/nature-600-337.jpg" />
  //   </CardMedia>
  //   <CardTitle title="Card title" subtitle="Card subtitle" />
  //   <CardText>
  //     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  //     Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
  //     Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
  //     Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
  //   </CardText>
  //   <CardActions>
  //     <FlatButton label="Action1" />
  //     <FlatButton label="Action2" />
  //   </CardActions>
  // </Card>
// );
//
// export default CardExampleWithAvatar;
  // componentWillMount() {
  //   this.props.searchEvents();
  // }
  render() {
    // if (this.props.newAuction.tickets) {
    //   return <div>We have your tickets</div>;
    // }
    // const styles = {
    //   root: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     justifyContent: 'space-around',
    //   },
    //   gridList: {
    //     display: 'flex',
    //     flexWrap: 'nowrap',
    //     overflowX: 'auto',
    //   },
    // };
    //
    // const tilesData = [
    //   {
    //     img: 'images/grid-list/00-52-29-429_640.jpg',
    //     title: 'Breakfast',
    //     author: 'jill111',
    //   },
    //   {
    //     img: 'images/grid-list/burger-827309_640.jpg',
    //     title: 'Tasty burger',
    //     author: 'pashminu',
    //   },
    //   {
    //     img: 'images/grid-list/camera-813814_640.jpg',
    //     title: 'Camera',
    //     author: 'Danson67',
    //   },
    //   {
    //     img: 'images/grid-list/morning-819362_640.jpg',
    //     title: 'Morning',
    //     author: 'fancycrave1',
    //   },
    //   {
    //     img: 'images/grid-list/hats-829509_640.jpg',
    //     title: 'Hats',
    //     author: 'Hans',
    //   },
    //   {
    //     img: 'images/grid-list/honey-823614_640.jpg',
    //     title: 'Honey',
    //     author: 'fancycravel',
    //   },
    //   {
    //     img: 'images/grid-list/vegetables-790022_640.jpg',
    //     title: 'Vegetables',
    //     author: 'jill111',
    //   },
    //   {
    //     img: 'images/grid-list/water-plant-821293_640.jpg',
    //     title: 'Water plant',
    //     author: 'BkrmadtyaKarki',
    //   },
    // ];

    const auction = this.props.newAuction;
    // IF this.props.events return below , else
    return (
      <Card className="sellerconfirmation">
        <CardHeader title="Confirmed"
        />
        <CardMedia
          overlay={<CardTitle title="Thank You!" subtitle="Sit back and relax, we'll take care of the rest" />}
        >
        </CardMedia>
        <CardTitle  />
        <CardText>
          <div>Event: {auction.eventName}</div>
          <div>Date: {auction.evenDate}</div>
          <div>Number of tickets: {auction.numTickets}</div>
          <div>Start Price: ${auction.startPrice}</div>
          <div>Min Price: ${auction.minPrice}</div>
        </CardText>
      </Card>


      // <div>
      // <h1>Confirmed</h1>
      //   <h2>Thank you!</h2>
      //   <h3>Sit back and relax. We'll take care of the rest.</h3>
      //   <div>Event: {auction.eventName}</div>
      //   <div>Date: {auction.evenDate}</div>
      //   <div>Number of tickets: {auction.numTickets}</div>
      //   <div>Start Price: ${auction.startPrice}</div>
      //   <div>Min Price: ${auction.minPrice}</div>
      // </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newAuction: state.newAuction,
    events: state.events,
    userLocation: state.userLocation,
  };
}

export default connect(mapStateToProps)(SellerConfirmation);


{/* <div style={styles.root}>
  <GridList style={styles.gridList} cols={2.2}>
    {tilesData.map((tile) => (
      <GridTile
        key={tile.img}
        title={tile.title}
        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
      >
        <img src={tile.img} />
      </GridTile>
    ))}
  </GridList>
</div> */}
