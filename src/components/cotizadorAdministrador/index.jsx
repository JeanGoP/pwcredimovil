import React from "react";

const CotizadorAdministrador=()=>{
    return(
        <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
            <label htmlFor="" className="form-label">Ruta Iframe Cotizador</label>
            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 div__btn__administrador text-end">
            <button type="button" className="btn btn-primary btn__guardar__info__administrador" >Guardar</button>
        </div>

    </div>
    )
}

export default CotizadorAdministrador;