import React from 'react';
import { Switch, Route } from 'react-router-dom';

export const ConnectedRoute = addLocation(props => <Route {...props} />);
