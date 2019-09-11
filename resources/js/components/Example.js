import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// importando componetnes
import TransferForm from './TransferForm'
import TransferList from './TransferList'
import url from '../url'

export default class Example extends Component {

    constructor(props){
        super(props);

        this.state = {
            money: 0.0,
            transfers: [],
            error: null,
            form:{
                description:'',
                amount:'',
                wallet_id: 1
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleDeleteWallet = this.handleDeleteWallet.bind(this)
    }

    
   async handleSubmit(e){
        e.preventDefault();
        
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form),
                
            }
            let res = await fetch(`${url}/api/transfer`,config)
            let data = await res.json()
            // para actualizar el dinero
            res = await fetch(`${url}/api/wallet`)
            let dataW = await res.json()

            this.setState({
                transfers: this.state.transfers.concat(data),
                money: dataW.money,
                form:{
                    description:'',
                    amount:'',
                }
            })

        } catch (error) {
            this.setState({
                error
            })
        }
    }

    handleChange(e){
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }



    async componentDidMount(){
        try {
            let res = await fetch(`${url}/api/wallet`)
            let data = await res.json()
            console.log('componentDidMount');
            
            this.setState({
                money: data.money,
                transfers: data.transfers
            })
        } catch (error) {
            this.state({
                error
            })
        }
    }
    

   async handleDelete(id){
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            }
            let res = await fetch(`${url}/api/transferDelete`,config)
            let data = await res.json()
            // console.log(data);
            res = await fetch(`${url}/api/wallet`)
            let dataW = await res.json()
            
            
            this.setState({
                transfers: data,
                money: dataW.money
            })
            
            

        } catch (error) {
            this.setState({
                error
            })
        }

    }

    async handleDeleteWallet(){
        let resultado = confirm("¿Quieres borrar todos los registros?");
        if(resultado){
            
            try {
                let res = await fetch(`${url}/api/walletDelete`)
                let data = await res.json()
                
                this.setState({
                    money: data.money,
                    transfers: data.transfers
                })
            } catch (error) {
                this.state({
                    error
                })
            }
        }
    }
    

    render(){
        const estilo = {
            fontSize: '4em',
            textAlign: 'center'
        }

        return (
            <div className="container-fluid">
                <div className="row">

                    <div className="col-sm-6 col-lg-4 formulario mb-5">
                        <div className="row justify-content-center">

        {/* //centroado por la fila y el estilo aplicado */}
                            <div className="col-4" >

                                <div >
                                    <h1 
                                        style={estilo} 
                                        className="font-weight-bold"
                                        onClick={this.handleDeleteWallet}>
                                        
                                            ${this.state.money}
                                    </h1>
                                </div>
                                
                            </div>
                        </div>

                            <div className="row justify-content-center ">
                                <div className="col-12 ">

                                    <TransferForm 
                                    form={this.state.form}
                                    onChange={this.handleChange}
                                    onSubmit={this.handleSubmit}
                                    />
                                </div>
                            </div>
                    </div>
    {/* inicia la tabla */}
                    <div className="col-sm-6 col-lg-8 tabla">
                        <div className="row justify-content-center">
                            <div className="col-10">
                                    <TransferList 
                                    transfers={this.state.transfers}
                                    handleDelete={this.handleDelete}
                                    />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
