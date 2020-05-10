import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { fetchDeviceDetails } from '../redux/ActionCreators';
import { ListItem, Icon } from 'react-native-elements';

const mapStateToProps = state => {
    return {
        deviceDetails: state.deviceDetails
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDeviceDetails: (id) => dispatch(fetchDeviceDetails(id))
})


class DeviceDetail extends Component {

    static navigationOptions = {
        title: 'Devices Detail'
    };

    componentDidMount() {
        this.props.fetchDeviceDetails(this.props.navigation.getParam('deviceId',''));
    }



    render() {
        const { navigate } = this.props.navigation;

        if (this.props.deviceDetails.isLoading) {
            return (
                <Loading />
            )
        }
        else if (this.props.deviceDetails.errMess) {
            return(
                <View>
                    <Text>{this.props.deviceDetails.errMess}</Text>
                </View>
            )
        }
        else {
            const renderMeasurementItem = ({item, index}) => {
                return(
                    <ListItem
                        key={index}
                        leftIcon={<Icon type="font-awesome" name="laptop" size={24}/> }
                        title={<Text style={{fontSize:16, fontWeight: 'bold'}}>{item.name}</Text>}
                        subtitle={<View><Text style={{fontSize:11}}>{item.count})</Text></View>}
                        bottomDivider
                        chevron
                        onPress={ () => navigate('Chart', {channelId: item.channel, measurement: item.name})}
                    />
                );
            }
            //scan all channels for measurements
            var Measurements = [];
            for (i=0; i<this.props.deviceDetails.deviceDetails.channels.length; i++) {
                for (j=0; j<this.props.deviceDetails.deviceDetails.channels[i].measurements.length; j++) {
                    Measurements.push({
                        id: i*100+j,
                        name: this.props.deviceDetails.deviceDetails.channels[i].measurements[j].value,
                        count: this.props.deviceDetails.deviceDetails.channels[i].measurements[j].count,
                        channel: this.props.deviceDetails.deviceDetails.channels[i].id
                    });
                    console.log('=> Adding channel: ' + this.props.deviceDetails.deviceDetails.channels[i].measurements[j].value);
                }
            }

            return (
                <View>
                    <Text>Device ID: {this.props.deviceDetails.deviceDetails.deviceid}</Text>
                    <Text>Name: {this.props.deviceDetails.deviceDetails.name}</Text>
                    <Text>Type: {this.props.deviceDetails.deviceDetails.type}</Text>
                    <FlatList
                        data={Measurements} 
                        renderItem={renderMeasurementItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            );
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DeviceDetail);