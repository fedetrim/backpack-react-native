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

import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';

import BpkThemeProvider from '../bpk-theming';
import themeAttributes from '../../storybook/themeAttributes';

import BpkSectionList, {
  BpkSectionListItem,
  BpkSectionListItemSeparator,
  BpkSectionListHeader,
  BpkSectionListSearchField,
  BpkSectionListNoResultsText,
} from './index';

const styles = StyleSheet.create({
  topMargin: {
    marginTop: 20, // eslint-disable-line backpack/use-tokens
  },
  image: {
    width: 24, // eslint-disable-line backpack/use-tokens
    height: 16, // eslint-disable-line backpack/use-tokens
  },
});

const airportCities = [
  {
    title: 'Beijing',
    country: 'CN',
    data: [
      { id: 'PEK', name: 'Capital' },
      { id: 'NAY', name: 'Nanyuan' },
    ],
  },
  {
    title: 'Glasgow',
    country: 'UK',
    data: [
      {
        id: 'GLA',
        name: 'Glasgow International',
      },
      { id: 'PIK', name: 'Prestwick' },
    ],
  },
  {
    title: 'Paris',
    country: 'FR',
    data: [
      { id: 'BVA', name: 'Beauvais' },
      { id: 'CDG', name: 'Charles de Gaulle' },
      { id: 'ORY', name: 'Orly' },
    ],
  },
  {
    title: 'New York City',
    country: 'US',
    data: [
      { id: 'JFK', name: 'John F. Kennedy' },
      { id: 'LGA', name: 'LaGuardia' },
      { id: 'EWR', name: 'Newark' },
    ],
  },
];

const getFlagUriFromCountryCode = (countryCode) =>
  `https://images.skyscnr.com/images/country/flag/header/${countryCode.toLowerCase()}.png`;

class StatefulBpkSectionList extends React.Component<
  {
    extraEntries: number,
    showImages: boolean,
    includeSearch: boolean,
  },
  { selectedAirport: string, data: Array<any> },
> {
  itemPressCallbacks: { [string]: () => mixed };

  static propTypes = {
    extraEntries: PropTypes.number,
    showImages: PropTypes.bool,
    includeSearch: PropTypes.bool,
  };

  static defaultProps = {
    extraEntries: 0,
    showImages: false,
    includeSearch: false,
  };

  constructor(props) {
    super(props);
    this.itemPressCallbacks = {};
    this.state = { selectedAirport: 'GLA', data: this.getData() };
  }

  getOnItemPressCallback = (id): (() => mixed) => {
    this.itemPressCallbacks[id] =
      this.itemPressCallbacks[id] ||
      (() => this.setState({ selectedAirport: id }));
    return this.itemPressCallbacks[id];
  };

  getData = () => {
    const data = airportCities.slice();
    if (this.props.extraEntries > 0) {
      data.push({
        title: 'Unassigned',
        country: 'None',
        data: new Array(this.props.extraEntries)
          .fill()
          .map((_, i) => ({ id: i.toString(), name: `Airport ${i}` })),
      });
    }
    return data;
  };

  filterData = (text) => {
    const filteredData = airportCities.filter((city) => {
      const filteredAirports = city.data.filter((airport) =>
        airport.name.toLowerCase().includes(text.toLowerCase()),
      );
      if (filteredAirports.length > 0) {
        return {
          title: city.title,
          country: city.country,
          data: filteredAirports,
        };
      }
      return false;
    });
    this.setState({ data: filteredData });
  };

  renderItem = ({ item, section }) => (
    <BpkSectionListItem
      title={item.name}
      selected={this.state.selectedAirport === item.id}
      image={
        this.props.showImages ? (
          <Image
            source={{ uri: getFlagUriFromCountryCode(section.country) }}
            style={styles.image}
          />
        ) : null
      }
      onPress={this.getOnItemPressCallback(item.id)}
    />
  );

  render() {
    return (
      <BpkSectionList
        sections={this.state.data}
        renderItem={this.renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <BpkSectionListHeader title={title} />
        )}
        ItemSeparatorComponent={
          Platform.OS === 'ios' ? BpkSectionListItemSeparator : null
        }
        keyExtractor={(item) => item.id}
        removeClippedSubviews
        ListHeaderComponent={
          this.props.includeSearch ? (
            <BpkSectionListSearchField
              placeholder="Search airports"
              onChangeText={this.filterData}
            />
          ) : null
        }
        ListEmptyComponent={
          this.props.includeSearch ? (
            <BpkSectionListNoResultsText>
              No results
            </BpkSectionListNoResultsText>
          ) : null
        }
      />
    );
  }
}

storiesOf('bpk-component-section-list', module)
  .addDecorator((getStory) => (
    <View style={styles.topMargin}>{getStory()}</View>
  ))
  .add('docs:default', () => <StatefulBpkSectionList />)
  .add('docs:with-images', () => <StatefulBpkSectionList showImages />)
  .add('docs:with-search', () => <StatefulBpkSectionList includeSearch />)
  .add('Perf (Long list)', () => <StatefulBpkSectionList extraEntries={200} />)
  .add('Themed', () => (
    <BpkThemeProvider theme={themeAttributes}>
      <StatefulBpkSectionList />
    </BpkThemeProvider>
  ));
