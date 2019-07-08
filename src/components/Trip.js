import React from 'react';
import { connect } from 'react-redux'
import { getTheTrip, deleteTheTrip } from '../actions'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Icon, Button, Modal, Form } from 'semantic-ui-react'
import Select from 'react-select'
import { countryOptions } from '../data';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment'


class Trip extends React.Component {
  constructor(props) {
    super(props);
    const startDate = Moment(this.props.trip.startDate, "YYYY-MM-DD")
    const endDate = Moment(this.props.trip.endDate, "YYYY-MM-DD")

    this.state = {
      title: this.props.trip.title,
      startDate: startDate._d,
      endDate: endDate._d,
      destination: this.props.trip.destination
    };
  }

  // CONVERTS COUNTRY NAME STRING TO AN OBJECT
  converter = countryNameStr => {
    return {value: countryNameStr, label: countryNameStr}
  } // END CONVERTING

  // UPDATE TRIP TITLE
  handleChangeTitle = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // UPDATE START DATE
  handleChangeStartDate = (date) => {
    this.setState({
      startDate: date
    });
  }

  // UPDATE END DATE
  handleChangeEndDate = (date) => {
    this.setState({
      endDate: date
    });
  }

  // UPDATE DESTINATION
  handleDestinationSelector = event => {
    this.setState({
      destination: event.value
    })
  }

  handleSubmitEditTrip = event => {
    event.preventDefault()
    const tripId = this.props.trip.id
    fetch(`http://localhost:3000/trips/${tripId}`, {
      method: "PATCH",
      headers: {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
          trip: {
            title: this.state.title,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            destination: this.state.destination,
            user_id: this.props.user.id
          }
        // store_id:e.target.id
        })
    })
    .then(resp => resp.json())
    .then(data =>
      alert("The Trip is Successfully Edited!"))
    window.location.replace(`http://localhost:3001/`)
  }

  // CALL DISPATCH TO PROPS ON CLICK
  handleClickEdit = (e) => {
    // console.log(this.props.trip.id);
    // selected trip info will be saved in the store on click
    this.props.getTheTrip(this.props.trip)
  } // END CALLING

  // DELETE THE TRIP
  handleClickDelete = () => {
    // console.log('selected trip id:',this.props.trip.id);
    // optimistically update the redux store
    this.props.deleteTheTrip(this.props.trip.id)

    // send delete fetch request
    const tripId = this.props.trip.id
    fetch(`http://localhost:3000/trips/${tripId}`, {
      method: "DELETE"
    })
  } // END DELETING


  // SEND TRIP INFO TO STORE
  handleClickTripDiv = e => {
    this.props.getTheTrip(this.props.trip)
  } // END SENDING


  render(){
    // console.log('Trip Props', this.props)
    // console.log('Trip State', this.state)
    const {isSearchable} = this.state;
    return(
      <div className="trip-container">
          <div className="trip-conts">
            <Link
              to='/itinerary'
              onClick={this.handleClickTripDiv}
            >
              <h3 className="trip-title capitalize">{this.props.trip.title}</h3>
              <p className="trip-period">{this.props.trip.startDate} ~ {this.props.trip.endDate}</p>
              <p className="trip-destination capitalize">{this.props.trip.destination}</p>
            </Link>
          <div className="btn-container ">

          <Modal
            closeIcon
            size="tiny"
            trigger={
              <Button
                primary size='tiny'
                className=''
                id={this.props.trip.id}
                onClick={this.props.handleClickEditBtn}
              >
                <Icon name='edit' size='small' />Edit
              </Button>
            }>
            <Modal.Header>Edit a Trip</Modal.Header>
            <Modal.Content>
              <Modal.Description>

                <Form
                  onSubmit={this.handleSubmitEditTrip}
                  className=''>
                  <Form.Field className=''>
                    <label>Title</label>
                    <input type="text" name="title" defaultValue={this.props.trip.title}
                    placeholder="Enter a Trip Title" onChange={this.handleChangeTitle}
                    className=''/>
                  </Form.Field>
                  <Form.Field className="start-date ">
                    <label>Start Date</label>
                    <DatePicker className='' selected={this.state.startDate}
                    onChange={this.handleChangeStartDate} />
                  </Form.Field>
                  <Form.Field className="end-date ">
                    <label>End Date</label>
                    <DatePicker className='' selected={this.state.endDate}
                    onChange={this.handleChangeEndDate} />
                  </Form.Field>
                  <Form.Field>
                    <label>Destination</label>

                    <Select
                      className="basic-single "
                      classNamePrefix="select"
                      isSearchable={isSearchable}
                      name="color"
                      options={countryOptions}
                      onChange={this.handleDestinationSelector}
                      defaultValue={this.converter(this.state.destination)}
                    />
                  </Form.Field>
                  <div className='form-btn-container'>
                    <Button
                      type='submit'
                      positive icon='checkmark'
                      labelPosition='right'
                      content='Submit'
                    >
                    </Button>
                  </div>
                </Form>
              </Modal.Description>
            </Modal.Content>
          </Modal>

            <Button negative
              onClick={this.handleClickDelete}
              className=""
              size='tiny'
            >
              <Icon name='trash alternate outline' size='small' />
              Delete
            </Button>
            </div>
          </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTheTrip: trip => {
      dispatch(getTheTrip(trip))
    },
    deleteTheTrip: tripId => {
      dispatch(deleteTheTrip(tripId))
    }
  }
}

const mapStateToProps = state => {
  return {
    trips: state.trips,
    user: state.user,
    theTrip: state.theTrip
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Trip))
