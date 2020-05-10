import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Channels extends Component {

    static navigationOptions = {
        title: 'Channels'
    };

    render() {
        return(
            <View style={{flex:1, justifyContent: "center", alignItems: "center"}} >
                <Text>Channels</Text>
            </View>
        );
    }
}

export default Channels;
