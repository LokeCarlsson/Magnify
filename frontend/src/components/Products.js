import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';

const Products = ({ products }) => (
  <List>
    {
      products.map((product, key) =>
      (<Link key={key} to={`/ProductView/${product._id}`}>
        <ListItem>
        Name: {product.name}, Company: {product.company.name}{product.category ? `, Category: ${product.category.name}` : ''}
        </ListItem>
      </Link>),
    )}
  </List>
);

Products.propTypes = {
  products: PropTypes.array.isRequired, //eslint-disable-line
};

export default Products;
