import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";

function InfoBox({title,cases,total}) {
    return (
        <Card style= {{width: '15rem'}}className="infoBox">
           <CardContent style={{ justifyContent:'center'}}>
               {/* title corona virus cases*/}
               <Typography className="infoBox__title" color="textSecondary" >
                   {title}
               </Typography>
               <h2 className="infoBox__cases">{cases}</h2>
              <Typography className="infoBox__total" color="textSecondary">{total}</Typography>
               {/* No. of cases */}
               {/* tatal cases */}
           </CardContent>
        </Card>
    )
}

export default InfoBox
