import React, {Component} from 'react';
import { AreaChart, LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import { View, Text, Dimensions, StyleSheet, ScrollView}  from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { fetchChart, chartLoading } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent'; 
import moment from 'moment';

const mapStateToProps = state => {
    return {
        chart: state.chart
    }
}

const mapDispatchToProps = dispatch => ({
    chartLoading: () => dispatch(chartLoading()),
    fetchChart: (channel,measurement,duration) => dispatch(fetchChart(channel,measurement,duration)),
})


class MeasurementChart extends Component {

    componentDidMount() {
        this.props.chartLoading();
        this.props.fetchChart(
            this.props.navigation.getParam('channelId',''), 
            this.props.navigation.getParam('measurement',''),
            24 * 60 * 60 * 1000
        );
    }

  
    timeRangeSelected (selectedIndex) {
        
        var duration = 24 * 60 * 60 * 1000;
        if (selectedIndex == 1) {duration = 2* duration;}
        if (selectedIndex == 2) {duration = 7* duration;}
        if (selectedIndex == 3) {duration = 30 * duration;}
        this.props.fetchChart(
            this.props.navigation.getParam('channelId',''), 
            this.props.navigation.getParam('measurement',''),
            duration
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

                var minValue = Number.MAX_VALUE;
                var maxValue = Number.MIN_VALUE;
                var minValueTime = ' ';
                var maxValueTime = ' ';
                var values = [];
                var from = new Date(Date.parse(this.props.chart.chartData.from));
                var to = new Date(Date.parse(this.props.chart.chartData.to));

                for (i=0; i<this.props.chart.chartData.values.length; i++) {
                    if (this.props.chart.chartData.values[i].value < minValue) {
                        minValue = this.props.chart.chartData.values[i].value;
                        minValueTime = this.props.chart.chartData.values[i].time;
                    }
                    if (this.props.chart.chartData.values[i].value > maxValue) {
                        maxValue = this.props.chart.chartData.values[i].value;
                        maxValueTime = this.props.chart.chartData.values[i].time;
                    }
                    values.push({
                        value: parseFloat(this.props.chart.chartData.values[i].value),
                        time: new Date(Date.parse(this.props.chart.chartData.values[i].time)),
                        index: i
                    });
                }

                console.log('----- VALUES')
                console.log(values);
                console.log('----- VALUES END')
                
                
                return(
                    <ScrollView style={styles.grayBox}>
                        <View style={styles.whiteBox}> 
                            <View style={{marginBottom: 8 }}>
                                <View style={styles.innerBox}>
                                    <Text style={styles.labelText}>Channel</Text>
                                    <Text style={styles.contentText}>{this.props.chart.chartData.channel_name}</Text>
                                </View>
                                <View style={styles.innerBox}>
                                    <Text style={styles.labelText}>Value</Text>
                                    <Text style={styles.contentText}>{this.props.chart.chartData.measurement}</Text>
                                </View>
                                <View style={styles.innerBox}>
                                    <Text style={styles.labelText}>from</Text>
                                    <Text style={styles.contentText}>{this.props.chart.chartData.from}</Text>
                                </View>
                                <View style={styles.innerBox}>
                                    <Text style={styles.labelText}>to</Text>
                                    <Text style={styles.contentText}>{this.props.chart.chartData.to}</Text>
                                </View>
                                <View style={styles.innerBox}>
                                    <Text style={styles.labelText}>Count</Text>
                                    <Text style={styles.contentText}>{JSON.stringify(this.props.chart.chartData.values.length,null,4)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.whiteBox}>
                            <ButtonGroup
                                buttons={['24h','48h','7 days','30 days']}
                                containerStyle={{height: 40, borderColor: 'white'}}
                                buttonStyle={styles.buttonStyle}
                                onPress={(index) => {
                                    this.timeRangeSelected(index);
                                }}
                            />
                        </View>
                        <View style={styles.whiteBox}>
                            <View style={styles.chartBox}>
                                <YAxis
                                    style = {styles.chartYAxis}
                                    data = {values}
                                    yAccessor = {({item}) => item.value }
                                    contentInset={{ top: 20, bottom: 20 }}
                                    svg={{
                                        fill: 'grey',
                                        fontSize: 10,
                                    }}
                                    numberOfTicks={10}
                                    formatLabel={(value) => `${value}`}
                                />
                                <View style={{ flex: 1, marginLeft: 5 }}>
                                    <AreaChart 
                                        style = {styles.chart}
                                        data  = {values}
                                        yAccessor = { ({item}) => item.value}
                                        xAccessor = { ({item}) => item.index}
                                        xScale={scale.scaleLinear}
                                        contentInset={{ top: 30, bottom: 30 }}
                                        curve={shape.curveNatural}
                                        svg={{ fill: 'rgba(180, 0, 0, 0.5)' , stroke: 'rgb(100, 0, 0)' }} 
                                        >
                                            <Grid />
                                    </AreaChart>
                                    <XAxis 
                                        data = {values}
                                        xAccessor = { ({item}) => item.time}
                                        xScale={scale.scaleTime}
                                        numberOfTicks={9}
                                        formatLabel={(value) => moment(value).format('HH:mm')}
                                        contentInset={{ left: 10, right: 0 }}
                                        svg={{
                                            fill: 'black',
                                            fontSize: 10,
                                            rotation: -45,
                                            originY: 14,
                                            y: 5,
                                        }}
                                        style={{ marginTop: -10, marginHorizontal: 0, height: 40 }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.whiteBox}>
                            <View style={styles.innerBox}>
                                <Text style={styles.labelText}>Min</Text>
                                <Text style={styles.contentText}>{minValue} at {minValueTime}</Text>
                            </View>
                            <View style={styles.innerBox}>
                                <Text style={styles.labelText}>Max</Text>
                                <Text style={styles.contentText}>{maxValue} at {maxValueTime}</Text>
                            </View>
                        </View>
                    </ScrollView>
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

const styles = StyleSheet.create({
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 5,
        flex: 1
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

/*
                        <View style={{marginLeft: 5}}>
                            <LineChart
                                data={{
                                    labels: ['Last 24 hours'],
                                    datasets: [{
                                        data: this.props.chart.chartData.values,
                                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                        strokeWidth: 1
                                    }]
                                }}
                                withDots={false}
                                width={Dimensions.get("window").width-10} // from react-native
                                height={ 550}
                                yAxisSuffix=" "
                                yAxisInterval = {this.props.chart.chartData.values.length / 5}
                                strokeWidth='2'
                                chartConfig={{
                                    backgroundColor: "#4040FF",
                                    backgroundGradientFrom: "#F0F0F1",
                                    backgroundGradientTo: "#FFFFFF",
                                    decimalPlaces: 2,
                                    color: (opacity = 0) => `rgba(0, 0, 200, 0.2)`,
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    propsForDots: {
                                        r: "0",
                                        strokeWidth: "0",
                                        stroke: "#000000"
                                    }
                                }}
                                bezier
                                style={styles.chart}
                            />
                        </View>
*/

export default connect(mapStateToProps,mapDispatchToProps)(MeasurementChart);