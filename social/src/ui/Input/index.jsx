import React, { forwardRef } from 'react';
import * as SC from './styles';

// Используем forwardRef для поддержки рефов
export const Input = forwardRef((props, ref) => <SC.Input ref={ref} {...props} />);