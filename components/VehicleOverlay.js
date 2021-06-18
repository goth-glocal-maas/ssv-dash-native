import {useMutation, useSubscription} from '@apollo/react-hooks';
import dayjs from 'dayjs';
import gql from 'graphql-tag';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

const GREEN = 'rgba(68, 252, 148, 0.3)';
const YELLOW = 'rgba(252, 186, 3, 0.5)';
const RED = 'rgba(249, 88, 67, 0.5)';

export default function VehicleOverlay() {
  const {data, loading} = useSubscription(ACTIVE_WORKING_SHIFT);

  return (
    <View style={styles.container}>
      <View style={styles.rowFlex}>
        {!data && (
          <View style={styles.oneIcon}>
            <Icon name="car-outline" size={40} type="ionicon" onPress={async () => {}} />
            <Text>example</Text>
            <Text>@sipp11</Text>
            <Text>10s ago</Text>
          </View>
        )}
        {data &&
          data.items.length > 0 &&
          data.items.map((i) => <VIcon {...i} />)}
      </View>
      <View style={{width: 10}} />
    </View>
  );
}

function VIcon({id, start, latest_timestamp, vehicle, driver}) {
  return (
    <View style={styles.oneIcon}>
      <Icon name="car-outline" type="ionicon" onPress={async () => {}} />
      <Text>{vehicle.name}</Text>
      <Text>{driver.username}</Text>
      <Text>{dayjs(latest_timestamp).format()}</Text>
    </View>
  );
}

const ACTIVE_WORKING_SHIFT = gql`
  subscription ACTIVE_WORKING_SHIFT {
    items: working_shift(where: {end: {_is_null: true}}) {
      id
      start
      latest_timestamp
      vehicle {
        name
        license_plate
      }
      driver {
        username
      }
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  colFlex: {
    flexDirection: 'column',
  },
  rowFlex: {
    flexDirection: 'row',
  },
  oneIcon: {
    backgroundColor: '#ffffffbb',
    paddingHorizontal: 20,
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginLeft: 0,
    borderColor: '#777777',
    borderWidth: 3,
    borderRadius: 10,
  },
});
