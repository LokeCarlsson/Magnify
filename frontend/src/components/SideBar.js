import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom';
import Badge from 'material-ui/Badge';

import leftside from '../leftside.jpg';

const SideBarItem = styled('div')
`
  width: 178px;
`;

const SideBarDivider = styled('div')
`
  background-image: url(${leftside});

  background-repeat: no-repeat;
  background-size: cover;
  border-right: 1px solid black;
  
  text-align: center;
  margin-right: 20px;
`;

const SideBarDivider_old = styled('div')
`
  width: 178px;
  height: 671px;
  background-image: url(${leftside});
  border-right: 1px solid black;
  float: left;
  text-align: center;
  margin-right: 20px;
`;

/* const ForumBadge = styled(Badge)`
  padding: 0px 12px 0px 0px;
`; */

const SideBar = ({
    username,
    logout,
    role,
    unseenThreads,
    updateUnseen
  }) => ( <
    SideBarDivider className = "sidebar" > {
      username === null ? undefined : < SideBarItem > < Link to = "/profile"
      onClick = {
        updateUnseen
      } > < button className = "sidebar-btn" > Profile < /button></Link > < /SideBarItem>
    } {
      username === null ? undefined : < SideBarItem > < Link to = "/products"
      onClick = {
        updateUnseen
      } > < button className = "sidebar-btn" > Products < /button></Link > < /SideBarItem>
    } {
      (username === null || role === 'consumer') ? undefined: < SideBarItem > < Link to = "/addProduct"
      onClick = {
        updateUnseen
      } > < button className = "sidebar-btn" > Add product < /button></Link > < /SideBarItem>
    } {
      role === 'companyAdmin' ? < SideBarItem > < Link to = "/addRep"
      onClick = {
        updateUnseen
      } > < button className = "sidebar-btn" > Add representative < /button></Link > < /SideBarItem> : undefined
    } <
    SideBarItem >
    <
    Link to = "/forum"
    onClick = {
      updateUnseen
    } > < button className = "sidebar-btn" > Forum < /button></Link > {
      role === 'companyRep' || role === 'companyAdmin' ? < Badge badgeContent = {
        unseenThreads.length
      }
      secondary style = {
        {
          padding: '0px 24px 18px 12px'
        }
      }
      /> : undefined } < /
      SideBarItem > {
        username === null ? < SideBarItem > < Link to = "/login" > < button className = "sidebar-btn" > Log in < /button></Link > < /SideBarItem> : <
        SideBarItem > < button className = "sidebar-btn"
        onClick = {
          () => logout()
        } > Log out < /button></SideBarItem >
      } {
        username === null ? < SideBarItem > < Link to = "/register" > < button className = "sidebar-btn" > Create an account < /button></Link > < /SideBarItem> : undefined
      } <
      /SideBarDivider>
    );

    SideBar.propTypes = {
      username: PropTypes.string,
      logout: PropTypes.func.isRequired,
      role: PropTypes.string,
      unseenThreads: PropTypes.arrayOf(PropTypes.any).isRequired,
    };

    SideBar.defaultProps = {
      username: null,
      role: null
    };

    export default SideBar;