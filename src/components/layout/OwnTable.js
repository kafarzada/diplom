import React from 'react'
import { FormCheck, Table } from 'react-bootstrap'

const OwnTable = (props) => {

    const {titles, data} = props 


    return (
        <Table>
             <thead>
            <tr>
                {
                titles.map(title => <th>{title}</th>)
                }
            </tr>
            </thead>
            <tbody>

            {
                data.map(d => {
                
                    const td = []
                    for(var i in d) {
                        td.push(d[i])
                    }
                    return (
                        <tr>
                            {
                                td.map(i => {
                                    if(typeof i === 'boolean') {
                                        return (
                                            <>
                                                <td><FormCheck checked={i}></FormCheck></td>
                                            </>
                                        )
                                    } else {
                                        return (
                                            <>
                                                <td>{i}</td>
                                            </>
                                        )
                                    }
                                })
                            }
                        </tr>
                    )
                })
            }

            </tbody>
        </Table>
    )
}



export default OwnTable