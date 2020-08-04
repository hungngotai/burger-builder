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
    <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(ctl => {
        return <BuildControl
                  key={ctl.label}
                  label={ctl.label}
                  added={() => props.addIngredient(ctl.type)}
                  removed={() => props.removeIngredient(ctl.type)}
                  disabled={props.disableInfo[ctl.type]}
               />
    })}
    <button className={classes.OrderButton} disabled={!props.purchasable}>ORDER NOW!</button>
  </div>
)

export default buildControls