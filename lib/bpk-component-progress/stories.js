/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { spacingMd } from 'bpk-tokens/tokens/base.react.native';
import capitalize from 'lodash/capitalize';

import BpkThemeProvider from '../bpk-theming';
import CenterDecorator from '../../storybook/CenterDecorator';
import BpkButton from '../bpk-component-button';
import BpkText from '../bpk-component-text';
import themeAttributes from '../../storybook/themeAttributes';

import BpkProgress, { type BpkProgressProps } from './index';

const styles = StyleSheet.create({
  barContainer: {
    marginBottom: spacingMd,
  },
  steps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: spacingMd,
  },
});

type BpkProgressType = $PropertyType<BpkProgressProps, 'type'>;

class ProgressContainer extends Component<
  { initialValue: number, steps: Array<number>, types: Array<BpkProgressType> },
  { progress: number },
> {
  static propTypes = {
    steps: PropTypes.arrayOf(PropTypes.number).isRequired,
    initialValue: PropTypes.number.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      progress: this.props.initialValue,
    };
  }

  handleChange = (progress) => {
    this.setState({ progress });
  };

  render() {
    const { steps, types, ...rest } = this.props;

    delete rest.initialValue;

    return (
      <View>
        {types.map((type) => (
          <View key={type} style={styles.barContainer}>
            <BpkText>{capitalize(type)}</BpkText>
            <BpkProgress
              min={0}
              max={100}
              type={type}
              value={this.state.progress}
              accessibilityLabel={(min, max, value) =>
                `${value} percent of ${max}`
              }
            />
          </View>
        ))}
        <View style={styles.steps}>
          {steps.map((step) => (
            <BpkButton
              key={step}
              type="secondary"
              onPress={() => this.handleChange(step)}
              title={`${step}`}
            />
          ))}
        </View>
      </View>
    );
  }
}

storiesOf('bpk-component-progress', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <ProgressContainer initialValue={40} steps={[]} types={['default']} />
  ))
  .add('docs:bar', () => (
    <ProgressContainer initialValue={40} steps={[]} types={['bar']} />
  ))
  .add('Default', () => (
    <ProgressContainer
      initialValue={40}
      steps={[0, 25, 50, 75, 100]}
      types={['default', 'bar']}
    />
  ))
  .add('Default Themed', () => (
    <BpkThemeProvider theme={themeAttributes}>
      <ProgressContainer
        initialValue={40}
        steps={[0, 25, 50, 75, 100]}
        types={['default', 'bar']}
      />
    </BpkThemeProvider>
  ));
