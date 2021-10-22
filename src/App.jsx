import React, { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts"
import { CartesianAxis } from "recharts/lib/cartesian/CartesianAxis"
import "./App.css"

// verticalFill={["#f1f2f2", "#f9fafa"]}

function App() {
  const [liveData, setLiveData] = useState()
  const [yesterdayData, setYesterdayData] = useState()
  const [yesterdayClose, setYesterdayClose] = useState()

  useEffect(() => {
    fetch("https://sandbox.iexapis.com/stable/stock/aapl/intraday-prices/?token=Tpk_095b8e5990924d0c8c41c2209556da53&chartInterval=10")
      .then((response) => response.json())
      .then((data) => setLiveData(data))
  }, [])

  useEffect(() => {
    fetch("https://sandbox.iexapis.com/stable/stock/aapl/chart/date/20211020?token=Tpk_095b8e5990924d0c8c41c2209556da53&chartInterval=10")
      .then((response) => response.json())
      .then((data) => setYesterdayData(data))
  }, [])

  useEffect(() => {
    fetch("https://sandbox.iexapis.com/stable/stock/aapl/previous/?token=Tpk_095b8e5990924d0c8c41c2209556da53")
      .then((response) => response.json())
      .then((data) => setYesterdayClose(data))
  }, [])

  return (
    <div className="chart">
      <LineChart width={1000} height={477}>
        <CartesianGrid stroke="#eaebeb" verticalFill={["#e6e6e680", "#ffffff00"]} />

        <YAxis
          stroke="#eaebeb"
          tickSize={10}
          tick={{ fill: "#7f7f7f", fontSize: 12, fontFamily: "Roboto" }}
          interval="preserveStartEnd"
          tickCount={12}
          allowDecimals={false}
          domain={["auto", "auto"]}
          padding={{ top: 24 }}
          dx={-5}
        />

        <XAxis
          stroke="#eaebeb"
          tickSize={10}
          tick={{ fill: "#7f7f7f", fontSize: 12, fontFamily: "Roboto" }}
          interval="preserveStart"
          allowDuplicatedCategory={false}
          data={yesterdayData}
          dataKey="label"
          dy={5}
        />

        <Tooltip contentStyle={{ fontSize: 14, borderColor: "#aaabd1", textAlign: "center", fontFamily: "Roboto" }} />

        <ReferenceLine y={153} stroke="#aaabd1" strokeDasharray="5 3" />

        <Line hide={false} name="OPEN" data={liveData} dataKey="open" stroke="#aaabd1" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />

        <Line
          hide={true}
          name="21ST OCTOBER OPEN"
          data={yesterdayData}
          dataKey="open"
          stroke="grey"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </div>
  )
}

export default App
