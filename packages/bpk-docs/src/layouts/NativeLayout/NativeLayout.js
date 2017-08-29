/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import PropTypes from 'prop-types';
import React from 'react';

import SideNavLayout from './../SideNavLayout';
import * as routes from './../../constants/routes';

const links = [
  {
    id: 'BONDS',
    category: 'Bonds',
    links: [
      { id: 'TYPESETTING', route: routes.NATIVE_TYPESETTING, children: 'Typesetting' },
    ],
  },
  {
    id: 'ATOMS',
    category: 'Atoms',
    links: [
      { id: 'TEXT', route: routes.NATIVE_TEXT, children: 'Text' },
      { id: 'BUTTON', route: null, children: 'Button' },
    ],
  },
];

const NativeLayout = ({ children, ...rest }) => <SideNavLayout links={links} {...rest}>{children}</SideNavLayout>;

NativeLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NativeLayout;
