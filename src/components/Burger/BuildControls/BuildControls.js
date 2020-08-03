import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {controls.map(ctl => {
        return <BuildControl
                  key={ctl.label}
                  label={ctl.label}
                  added={() => props.addIngredient(ctl.type)}
                  removed={() => props.removeIngredient(ctl.type)}
               />
    })}
  </div>
)

export default buildControls