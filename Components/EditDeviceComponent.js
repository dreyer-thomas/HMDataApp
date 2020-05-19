import React, {Component} from 'react';
import { View,Text,StyleSheet, ScrollView, TextInput} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDevices } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        devices: state.devices
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDevices: () => dispatch(fetchDevices())
})

class EditDevice extends Component {

    render() {
        var DeviceId = this.props.navigation.getParam('deviceId','');
        var DeviceData = this.props.devices.devices.filter( (item) => item.id == DeviceId);
        if (DeviceData.length != 1) {
            return(
                <View>
                <Text>Error: DeviceID is not unique or not found! (DeviceID={DeviceId})</Text>
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
                                <Text style={styles.contentText}>{DeviceData[0].id} </Text>
                            </View>
                            <View style={styles.innerBox}>
                                <Text style={styles.labelText}>Device</Text>
                                <Text style={styles.contentText}>{DeviceData[0].device} </Text>
                            </View>
                            <View style={styles.innerBox}>
                                <Text style={styles.labelText}>Type</Text>
                                <Text style={styles.contentText}>{DeviceData[0].type} </Text>
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


export default connect(mapStateToProps,mapDispatchToProps)(EditDevice);