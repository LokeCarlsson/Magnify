import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import Picker from '../components/Picker';
import { getCategories } from '../actions/category';

class CategoryPickerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.getFilteredSubCategories = this.getFilteredSubCategories.bind(this);
    this.state = {
      selectedMainCategory: 'All',
      selectedSubCategory: 'All',
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCategories());
  }

  componentDidUpdate() {
    this.props.functionToRun(this.state);
  }

  getFilteredSubCategories() {
    const { subCategories } = this.props;
    const { selectedMainCategory } = this.state;
    return selectedMainCategory !== 'All' ? subCategories.filter(cat => cat.parent === selectedMainCategory) : subCategories;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { mainCategories, subCategories } = this.props;
    const { selectedMainCategory, selectedSubCategory } = this.state;
    return (
      <div>
        <Picker
          options={[{ name: 'All', _id: 'All' }].concat(mainCategories)}
          value={selectedMainCategory}
          onChange={this.handleChange}
          title={'Select main category'}
          name={'selectedMainCategory'}
        />
        <Picker
          options={[{ name: 'All', _id: 'All' }].concat(this.getFilteredSubCategories(subCategories))}
          value={selectedSubCategory}
          onChange={this.handleChange}
          title={'Select sub category'}
          name={'selectedSubCategory'}
        />
      </div>
    );
  }
}

CategoryPickerContainer.propTypes = {
  mainCategories: PropTypes.array.isRequired, // eslint-disable-line
  subCategories: PropTypes.array.isRequired, // eslint-disable-line
  dispatch: PropTypes.func.isRequired,
  functionToRun: PropTypes.func.isRequired,
};

CategoryPickerContainer.defaultProps = {
  mainCategories: [],
  subCategories: [],
  functionToRun: console.log,
};

const mapStateToProps = state => ({
  mainCategories: state.category.mainCategories,
  subCategories: state.category.subCategories,
});

export default connect(
  mapStateToProps,
)(CategoryPickerContainer);
