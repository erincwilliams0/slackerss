import React, { useState, useContext } from 'react';
import Ingredients from './SavedIngredients.jsx';
import axios from 'axios';
import { AppContext } from '../context/AppContext.jsx';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const SavedRecipe = ({ savedRecipe, getSavedRecipes, calorieCount, setCalorieCount }) => {
  const [expanded, setExpanded] = useState(false);
  const [loggedCal, setLoggedCal] = useState(0);
  // const { getLoggedRecipe } = useContext(AppContext);

  const deleteRecipe = () => {
    axios
      .delete(`/myrecipes/${savedRecipe._id}`)
      .then(() => {
        console.log('recipe deleted');
        getSavedRecipes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLogClick = (e) => {
    setCalorieCount(calorieCount += Math.round(e.calories))
  }

  return (
    <Card sx={{ maxWidth: 345 }} className='recipe-card'>
      <CardHeader
        action={
          <IconButton onClick={deleteRecipe}>
            <DeleteOutlineIcon />
          </IconButton>
        }
        title={savedRecipe.label}
      />
      <CardMedia
        component='img'
        height='140'
        image={savedRecipe.image}
        alt={savedRecipe.label}
      />
      <CardContent>
        <Typography gutterBottom variant='h6' component='div'>
          {Math.round(savedRecipe.calories)} Calories
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size='small' onClick={ () => { handleLogClick(savedRecipe) } }>Log Recipe</Button>
        <Button variant='contained' size='small' href={savedRecipe.url}>
          View Instructions
        </Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography>Ingredients:</Typography>
          <Ingredients ingredients={savedRecipe.ingredientLines} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default SavedRecipe;
