import React from 'react'



const TransferForm = ({form,onChange,onSubmit}) => (
    <form className="justify-content-center" onSubmit={onSubmit}>
        <div className="form-group mb-2">
            
            <input 
            type="text" 
            name="description" 
            className="form-control mr-4 mb-2 font-italic"
            placeholder="Descripción..."
            value={form.description}
            onChange={onChange}
            required
            />

            <input 
            type="number" 
            name="amount" 
            className="form-control mb-2 font-italic"
            placeholder="Monto $ -/+"
            value={form.amount}
            onChange={onChange}
            required
            />

            <button 
            type="submit"
            className="btn btn-primary mb-2 col-12 font-weight-bold">
                Añadir
            </button>

        </div>
    </form>


);

export default TransferForm;