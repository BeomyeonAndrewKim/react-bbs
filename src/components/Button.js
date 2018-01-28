import React, { Component } from 'react';
import config from '../config';
import styled from 'styled-components';

const Btn= styled.button`
  background-color: ${config.colorMap.GreyscaleColors.Greyscale3};
  color: ${config.colorMap.GreyscaleColors.Greyscale7};
  border: 1px solid ${config.colorMap.GreyscaleColors.Greyscale7};
  padding: 1em;
  &:hover, &:focus{
    background-color: white;
    color: blue;
    border: 1px solid ${config.colorMap.GreyscaleColors.Greyscale7};
    padding: 1em;
  }
  &:disabled{
    background-color: green;
    color:skyblue;
  }
  &.danger{
    background-color: ${config.colorMap.BrandColors.MainBlue0};
    color: ${config.colorMap.BrandColors.MainBlueLight1};
    border: 1px solid ${config.colorMap.GreyscaleColors.Greyscale7};
    padding: 1em;
  }
`;

export default class Btns extends Component {
  render() {
    const{children, disabled, className}=this.props
    return (
      <div>
        <Btn disabled={disabled} className={className}>{children}</Btn>
      </div>
    );
  }
}