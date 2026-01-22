import React from "react";

const ModalImagen = ({ urlImagen, idModal = "modalImagen", modalRef }) => {
  return (
    <div
      className="modal fade"
      id={idModal}
      ref={modalRef}
      tabIndex="-1"
      aria-labelledby={`${idModal}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${idModal}Label`}>Vista previa de la imagen</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div className="modal-body text-center">
            {urlImagen ? (
              <img
                src={urlImagen}
                alt="Vista previa"
                style={{ maxWidth: "100%", maxHeight: "500px", objectFit: "contain" }}
              />
            ) : (
              <p>No se ha cargado ninguna imagen.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalImagen;
