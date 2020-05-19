import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { fetchDevices } from '../redux/ActionCreators';
import { ListItem, Icon } from 'react-native-elements';
import SwipeOut from 'react-native-swipeout';

const mapStateToProps = state => {
    return {
        devices: state.devices
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDevices: () => dispatch(fetchDevices())
})

class Devices extends Component {

    static navigationOptions = {
        title: 'Devices'
    };

    componentDidMount() {
        this.props.fetchDevices();
    }

    render() {
        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) => {
            const rightButton = [
                {
                    text: 'Edit',
                    type: 'Edit',
                    onPress: () => navigate('EditDevice', {deviceId: item.id})
                }
            ]
            return(
                <SwipeOut right={rightButton} autoClose={true}>
                    <ListItem
                        key={index}
                        leftIcon={<Icon type="font-awesome" name="home" size={24}/> }
                        title={<Text style={{fontSize:16, fontWeight: 'bold'}}>{item.name}</Text>}
                        subtitle={<View><Text style={{fontSize:11}}>{item.device} ({item.type})</Text></View>}
                        bottomDivider
                        chevron
                        onPress={ () => navigate('DeviceDetail', {deviceId: item.id})}
                    />
                </SwipeOut>
            );
        }

        if (this.props.devices.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.devices.errMess) {
            return(
                <View>
                    <Text>{this.props.devices.errMess}</Text>
                </View>
            )
        }
        else {
            return(
                <FlatList
                    data={this.props.devices.devices} 
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Devices);