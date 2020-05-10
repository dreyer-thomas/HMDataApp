import React, {Component} from 'react';
import { LineChart } from 'react-native-chart-kit';
import {View, Text, Dimensions} from 'react-native';
import { fetchChart } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent'; 

const mapStateToProps = state => {
    return {
        chart: state.chart
    }
}

const mapDispatchToProps = dispatch => ({
    fetchChart: (channel,measurement) => dispatch(fetchChart(channel,measurement))
})


class MeasurementChart extends Component {

    componentDidMount() {
        this.props.fetchChart(
            this.props.navigation.getParam('channelId',''), 
            this.props.navigation.getParam('measurement','')
        );
    }

    render() {
        const { navigate } = this.props.navigation;

        if (this.props.chart.isLoading) {
            return (
                <Loading />
            )
        }
        else if (this.props.chart.errMess) {
            return(
                <View>
                    <Text>{this.props.chart.errMess}</Text>
                </View>
            )
        }
        else {           
            if (this.props.chart.chartData && this.props.chart.chartData.values.length > 0) {
                var chartValues = [];
                var chartLabels = [];
                for (i=0; i<this.props.chart.chartData.values.length; i++) {
                    chartValues.push(this.props.chart.chartData.values[i].value);
                    if (i==0 || i==this.props.chart.chartData.values.length-1) {
                        chartLabels.push(this.props.chart.chartData.values[i].time);
                    }
                    else {
                        chartLabels.push('');
                    }
                }
                return(
                    <View>
                    <Text>{this.props.navigation.getParam('measurement','')}</Text>
                    <Text>Count: {JSON.stringify(this.props.chart.chartData.values.length,null,4)}</Text>
                    {
                    <LineChart
                        data={{
                            labels: chartLabels,
                            datasets: [{
                                data: chartValues,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                strokeWidth: 1
                            }]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={Dimensions.get("window").height}
                        yAxisSuffix=" "
                        yAxisInterval = {chartValues.length / 5}
                        chartConfig={{
                            backgroundColor: "#F0F0F0",
                            backgroundGradientFrom: "#F1F1F1",
                            backgroundGradientTo: "#F0F0F0",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 0) => `rgba(0, 0, 0, 0.1)`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            propsForDots: {
                                r: "0",
                                strokeWidth: "0",
                                stroke: "#ffa726"
                            }
                        }}
                    />
                    }
                    </View>
                );
            }
            else {
                return(
                    <View><Text>No Data Found</Text></View>
                )
            }
            
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MeasurementChart);