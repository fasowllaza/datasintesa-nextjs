'use client'
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import './graph.css'

interface RawData {
    availability: number,
    resultTime: Date
}

interface GraphData {
    x: number,
    y: string
}

const baseUrl = 'http://localhost:3001'

const Graph: React.FunctionComponent = (props: any) => {
    const [data, setData] = useState({x: [], y: []})
    const [filter, setFilter] = useState({
        enodebId: '',
        cellId: '',
        startDate: '',
        endDate: ''
    })
    const [loading, setLoading] = useState({
        loadingData: false,
        loadingGraph: false
    })

    useEffect( () =>{
      fetchData()
    },[])

    const trasnformData = async (datas: RawData []) => {
        let sortedData = datas
        sortedData.sort((a:any, b:any) => a.resultTime - b.resultTime)
        let transformedData: GraphData [] = []
        let x = []
        let y = []
        for await (const item of sortedData) {
            y.push(item.availability)   
            x.push(moment(item.resultTime).format('DD-MM-YYYY h:mm'))
        }
        setData({
            x,
            y
        })
        setLoading({...loading, loadingData: false})
    }

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFilter((prevFilter) => ({
          ...prevFilter,
          [name]: value,
        }));
      };

    const addParameter = (url: string, parameters:any) => {
        const separator = url.includes('?') ? '&' : '?';
        const parameterString:any = []
        Object.keys(parameters).forEach((params) => {
            if(parameters[params]) {
                parameterString.push(`${params}=${parameters[params]}`)
            }
        })
        const newUrl = `${url}${separator}${parameterString.join('&')}`;
        return newUrl
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        fetchData()
      };

    const fetchData = () => {
        setLoading({...loading, loadingData: true})
        fetch(addParameter(`${baseUrl}/raw-data`, filter) )
        .then((res) => res.json())
        .then((result) => {
            trasnformData(result)
            setLoading({...loading, loadingData: false})
        })
    }
    

    return <div className='center-container'>
        <h1>Filter</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="enodebId">eNodeB ID:</label>
          <input
            type="text"
            id="enodebId"
            name="enodebId"
            value={filter.enodebId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="cellId">Cell ID:</label>
          <input
            type="text"
            id="cellId"
            name="cellId"
            value={filter.cellId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filter.startDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filter.endDate}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
        <Plot
            data={[{
                x: data.x ? data.x : [1,2,3],
                y: data.y ? data.y : [4,5,6],
                type: 'scatter'
            }]}
        />
        
    </div>
  
  

} 

export default Graph