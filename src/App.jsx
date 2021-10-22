import React, { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts"
import { ResponsiveContainer } from "recharts/lib/component/ResponsiveContainer"
import "./App.css"

function App() {
  const [liveData, setLiveData] = useState()
  const [yesterdayData, setYesterdayData] = useState()

  useEffect(() => {
    fetch("https://sandbox.iexapis.com/stable/stock/aapl/intraday-prices/?token=Tpk_095b8e5990924d0c8c41c2209556da53&chartInterval=15")
      .then((response) => response.json())
      .then((data) => setLiveData(data))
  }, [])

  useEffect(() => {
    fetch("https://sandbox.iexapis.com/stable/stock/aapl/chart/date/20211020?token=Tpk_095b8e5990924d0c8c41c2209556da53&chartInterval=15")
      .then((response) => response.json())
      .then((data) => setYesterdayData(data))
  }, [])

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={980} height={437} >
          <CartesianGrid stroke="#eaebeb" verticalFill={["#f1f2f2", "#f9fafa"]} />

          <YAxis
            stroke="#eaebeb"
            tickSize={12}
            allowDecimals={false}
            interval="preserveStartEnd"
            domain={["dataMin-2", "auto"]}
            tick={{ fill: "#7f7f7f", fontSize: 12, fontFamily: "Roboto" }}
            padding={{ top: 24 }}
          />

          <YAxis/>

          <XAxis
            allowDuplicatedCategory={false}
            stroke="#eaebeb"
            tickSize={10}
            interval="preserveStart"
            data={yesterdayData}
            dataKey="label"
            tick={{ fill: "#7f7f7f", fontSize: 12, fontFamily: "Roboto" }}
          />

          <Tooltip
            contentStyle={{ borderColor: "#aaabd1", textAlign: "center" }}
            labelStyle={{ fontSize: 14, fontFamily: "Roboto" }}
            itemStyle={{ fontSize: 14, fontFamily: "Roboto" }}
          />

          <ReferenceLine y={155} stroke="#aaabd1" strokeDasharray="3 3" />

          <Line name="Today" data={liveData} dataKey="open" stroke="#aaabd1" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />

          <Line name="Yesterday" data={yesterdayData}  dataKey='open' stroke="grey" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />

        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default App
