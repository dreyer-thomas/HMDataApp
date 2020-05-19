import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Devices from './DevicesComponent';
import Channels from './ChannelsComponent';
import DeviceDetail from './DeviceDetailComponent';
import MeasurementChart from './MeasurementChartComponent';
import EditDevice from './EditDeviceComponent';
import EditChannel from './EditChannelComponent';
import EditChannelComponent from './EditChannelComponent';


const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView>
        <View>
            <Text style={styles.drawerHeaderText}>Homematic Data</Text>
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );

const DevicesNavigator = createStackNavigator({
    Devices: { screen: Devices },
    DeviceDetail: {screen: DeviceDetail},
    Chart: {screen: MeasurementChart},
    EditDevice: {screen: EditDevice},
    EditChannel: {screen: EditChannelComponent}
}, {
    navigationOptions:  ({navigation}) => ({
        headerLeft: <Icon name='menu' size={24} iconStyle={{color:'white'}} 
                          onPress={ () => navigation.toggleDrawer() } />
    })
});

const ChannelNavigator = createStackNavigator({
    Channels: { screen: Channels },
}, {
    navigationOptions:  ({navigation}) => ({
        headerLeft: <Icon name='menu' size={24} iconStyle={{color:'white'}} 
                          onPress={ () => navigation.toggleDrawer() } />
    })
});


const DrawerNavigator = createDrawerNavigator({
        Devices: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (<Icon name="home" type='font-awesome' style={{ color: tintColor }} />),
                drawerLabel: "Devices"
            },
            screen: DevicesNavigator
          },
        Channels: {
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (<Icon name="laptop" type='font-awesome' style={{ color: tintColor }} />),
                drawerLabel: "Channels"
            },
            screen: ChannelNavigator
        }
    },
    {
        contentComponent: props => <CustomDrawerContentComponent {...props} />
    }
);


const styles = StyleSheet.create({
    drawerHeaderText: {
      fontSize: 24,
      fontWeight: "bold",
      lineHeight: 100,
      textAlign: "center"
    }
});

export default createAppContainer(
    DrawerNavigator
);
