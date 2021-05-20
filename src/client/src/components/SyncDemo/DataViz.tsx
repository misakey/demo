import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


import { ReactComponent as ShoeIcon } from 'ressources/img/shoe.svg';
import SvgIcon from '@material-ui/core/SvgIcon';

import { colorsToHex } from 'helpers/generateRandomCart';

interface Product {
  quantity: string,
  description: string,
  price: number,
  tax: number,
}

interface Purchase {
  name: string,
  date: string,
  data: {
    invoiceNumber: number,
    invoiceDate: string,
    products: Array<Product>
  }
}

interface DataVizProps {
  purchases:Array<Purchase>,
}


const DataViz = ({ purchases }:DataVizProps):React.ReactElement => (
  <List>
    {purchases.map((purchase) => (
      <ListItem>
        <ListItemAvatar>
              <SvgIcon component={ShoeIcon} fontSize="large" viewBox="0 0 512 512" style={{ color: colorsToHex(purchase.data.products[0].description.split(' ')[1]), fontSize: 80 }}/>

        </ListItemAvatar>
        <ListItemText primary={`${purchase.data.products[0].description} - ${purchase.data.products[0].price*(100+purchase.data.products[0].tax)/100}€`} secondary={purchase.data.invoiceDate} />
      </ListItem>
    ))}
  </List>
);

export default DataViz;
