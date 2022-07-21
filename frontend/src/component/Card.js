import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
function Cards(props) {
  return (
    <div>
            <Link to={`/${props.links}`}>
 <Card sx={{ maxWidth: 345 }} style={{ backgroundColor:'red' }}>
        {props.img}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {props.title}
        </Typography>
      </CardContent>
    </Card>
 
    </Link>

    </div>
  )
}

export default Cards