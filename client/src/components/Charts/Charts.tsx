import React from 'react'
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import { IGraphData } from '../../interfaces';

interface Props {
    minDate: Date;
    maxDate: Date;
    minWeight: number;
    maxWeight: number;
    graphData: IGraphData[];
}

const Charts = (props: Props) => {
    const { minDate, maxDate, minWeight, maxWeight, graphData } = props;

    return (
        <div className="chart__container">
            <VictoryChart theme={VictoryTheme.material} >
                <VictoryAxis 
                    tickFormat={(x) => new Date(x).getMonth() + 1 + '/' + new Date(x).getDate()}
                />
                    <VictoryAxis dependentAxis
                    tickFormat={(y) => y + ' lbs'}
                />
                <VictoryLine
                    scale={{ x: "time", y: "linear" }}
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc"}
                    }}
                    domain={{
                        x: [minDate, maxDate],
                        y: [minWeight-100, maxWeight+100]
                    }}
                    data={graphData}
                />
                </VictoryChart>
        </div>
    )
}

export default Charts
