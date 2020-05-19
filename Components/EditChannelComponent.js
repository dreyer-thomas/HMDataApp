import React, {Component} from 'react';
import { View,Text,StyleSheet, ScrollView, TextInput} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDevices } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        deviceDetails: state.deviceDetails
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDevices: () => dispatch(fetchDevices())
})

class EditChannel extends Component {

    render() {
        // transferred from previous screen
        var measurement = this.props.navigation.getParam('measurement','');
        // device data
        var device = this.props.deviceDetails.deviceDetails;

        return(<View><Text>Channel Editor</Text></View>)
        /*
        var channelData = this.props.deviceDetails.deviceDetails.channels.filter( (item) => item.measurement == measurement);
        if (channelData.length != 1) {
            return(
                <View>
                <Text>Error: Measurement is not unique or not found! (Measurement={measurement})</Text>
            </View>
            );
        }
        else {
            return(
                <ScrollView style={styles.grayBox}>
                    <View style={styles.whiteBox}> 
                        <View style={{marginBottom: 8 }}>
                            <View style={styles.innerBox}>
                                <Text style={styles.labelText}>Device ID</Text>
                                <Text style={styles.contentText}>{this.props.deviceDetails.deviceDetails.deviceid} </Text>
                            </View>
                            <View style={styles.innerBox}>
                                <Text style={styles.labelText}>Device Name</Text>
                                <Text style={styles.contentText}>{this.props.deviceDetails.deviceDetails.name} </Text>
                            </View>
                            <View style={styles.innerBox}>
                                <Text style={styles.labelText}>Type</Text>
                                <Text style={styles.contentText}>{this.props.deviceDetails.deviceDetails.type} </Text>
                            </View>
                            <View style={styles.innerBox}>
                                <Text style={styles.labelText}>Channel ID</Text>
                                <Text style={styles.contentText}>{channelData[0].channelid} </Text>
                            </View>
                            <View style={styles.innerBox}>
                                <Text style={styles.labelText}>Channel Name</Text>
                                <Text style={styles.contentText}>{channelData[0].name} </Text>
                            </View>
                            <View style={styles.innerBox}>
                                <Text style={styles.labelText}>Channel Value</Text>
                                <Text style={styles.contentText}>{channelData[0].} </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.whiteBox}>
                        <View style={{marginBottom: 8 }}>
                            <View style={styles.innerBox}>
                                <Text style={styles.labelText}>Name</Text>
                                <TextInput style={styles.contentText}>{DeviceData[0].type} </TextInput>
                            </View>
                            <Button title='Save'
                                    style={{marginLeft: 50, marginRight:50, marginTop: 10, marginBottom: 10, flex: 1}}
                                    buttonStyle={{backgroundColor: '#606060'}}
                                    onPress={() => console.log('Updating Device Name')} />  
                        </View>
                    </View>
                </ScrollView>
            );
        }
        */
    }
}

const styles = StyleSheet.create({
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 5,
        flex: 1.5
    },
    contentText: {
        fontSize: 16,
        marginTop: 5,
        flex: 4
    },
    grayBox: {
        backgroundColor:'lightgray'
    },
    whiteBox: {
        backgroundColor:'white', 
        borderRadius: 16, 
        marginTop:8,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'column'
    },
    innerBox: {
        flexDirection: 'row'
    },  
    chartBox: {
        borderRadius: 16,
        height: 500, 
        margin: 10,
        flexDirection: 'row'
    },
    chartYAxis: {
        height: 465, 
        marginTop: 20,
        marginLeft: 10,
        marginBottom: 10,
        flex: 0
    },
    chart: {
        flex:1,
        marginTop: 10,
        marginRight: 8,
        marginBottom: 20,
        height: 500
    },
    buttonStyle: {
        borderRadius: 10,
        borderWidth: 0
    }
  });


export default connect(mapStateToProps,mapDispatchToProps)(EditChannel);