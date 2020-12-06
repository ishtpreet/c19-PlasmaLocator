import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import Header from './Header';
import AuthService from '../Services/auth-service';
import authHeader from '../Services/auth-header';

function NotificationList(){
    const [notifications, setNotification] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [reloadData, setReloadData] = useState(0.44)


    useEffect(()=>{
        setDataLoaded(false)
        let AuthHeader = authHeader();
        AuthService.usersRequests(AuthHeader)
        .then((response)=>{
            setDataLoaded(true)
            setNotification(response.data.notifications);
        })
    },[reloadData]);
    function resolveNotification(id, e){
        setLoading(true)
        e.preventDefault();
        document.getElementById(id).innerHTML = "Please Wait...";
        console.log(id);
        let AuthHeader = authHeader();
        AuthService.resolveRequest(AuthHeader, id)
        .then((response)=>{
            setLoading(false)
            document.getElementById(id).innerHTML = "Yes Please";
            setReloadData(Math.random());
            console.log(response.data.message)
        })
    }
    return (
        <div>
        <Header />
        <div className='col-12'>
        <div className='card-container'>
            {notifications.length<1 && dataLoaded ? <Alert style={{marginTop: '20px'}} key='hello' variant='warning'>
        No Requests Found. Please Check Back Later :)
        </Alert> : null}
        {dataLoaded ?   
        notifications.map(notification=>(
            
            <Card style={{ width: '70vw' }}
            bg="dark" 
            text="light">
            <Card.Body>
            <Card.Title>Notification Id: #{notification._id}</Card.Title>
              <Card.Text>
                User with User id #{notification.user_id} and email {notification.user_email} sent u a request to share your contact details.<br/> Are you Willing to share?
              </Card.Text>
              <Button id={notification._id} variant="primary"
              onClick={(e) => resolveNotification(notification._id, e)}
              >Yes Please
              </Button>
              {/* <button onClick={(e) => resolveNotification(notification._id, e)}>Yes Please</button> */}
            </Card.Body>
          </Card>
          )
          )  : <Spinner animation='border'/> }
         </div>
        </div>
        </div>
    )
}
export default NotificationList;