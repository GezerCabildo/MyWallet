import React from 'react';
import './TransferList.css';

export default class TransferList extends React.Component {

   render(){
    return(

            <table className="table ">
                <thead>
                    <tr>
                        <th scope="col" className="text-center">Descripción</th>
                        <th scope="col" className="text-center">Precio</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.transfers.map((transfer)=>(
                        <tr key={transfer.id}>
                            <td className="text-center">
                                {transfer.description}
                            </td>
                            <td
                                className={(transfer.amount > 0)?'text-success text-center':'text-danger text-center'}>
                                {transfer.amount}
                            </td>
                            <td className="text-center">
                                <button onClick={this.props.handleDelete.bind(this,transfer.id)} className="ml-4 btn btn-xs btn-danger btnCancelar">x</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
)
}
}
