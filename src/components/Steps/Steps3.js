import React, { useState } from "react";
import InputComponent from "../Inputs/InputComponent/InputComponent";
import { dummy } from "../../common/utils/Dummy/DummyRegister";

export const Steps3 = (props) => {
  const [aux, setAux] = useState(false);
  const [aux2, setAux2] = useState(false);
  const onhandleBlur = (e) => {
    setAux(!aux);
/*     props.setPets(e.target.value);
 */  };
  return (
    <>
      <div className="input-component">
        <p>Tiene hijos?</p>
        <input
          name="children"
          type="checkbox"
          {...props.register("children")}
        />
      </div>
      <div className="input-component">
        <p>Tiene mascotas?</p>
        <input
          onClick={(e) => onhandleBlur(e)}
          name="pets"
          type="checkbox"
          {...props.register("pets")}
        />
      </div>

      {aux == true && (
        <InputComponent
          type="text"
          label="¿Qué mascota?"
          placeholder=""
          icon="fa fa-user-o"
          className="my-4 "
          name="nePets"
          value={props?.getValues("newPets")}
          {...props.register("newPets", { required: true })}
          error={props.errors.otraMacosta}
          errorMsg="Complete este campo"
        />
      )}
      <div className="input-component">
        <p>Bebe alcohol?</p>
        <input name="alcohol" type="checkbox" {...props.register("alcohol")} />
      </div>
      <div className="input-component">
        <p>Fuma?</p>
        <input name="smoke" type="checkbox" {...props.register("smoke")} />
      </div>
      <div className="input-component">
        <p>Eres vegetariano?</p>
        <input name="vegan" type="checkbox" {...props.register("vegan")} />
      </div>
      <div className="input-component">
        <p>Tiene carro?</p>
        <input name="car" type="checkbox" {...props.register("car")} />
      </div>
      <div className="input-component">
        <p>Tiene moto?</p>
        <input
          name="motorcycle"
          type="checkbox"
          {...props.register("motorcycle")}
        />
      </div>

      {aux2 == true && (
        <InputComponent
          type="select"
          label="¿Cual?"
          placeholder=""
          icon="fa fa-user-o"
          className="mb-10"
          name="mascotaselector"
          aux={aux}
          setAux={setAux}
          optionAdd="Otro"
          value={props?.getValues("mascotaselector")}
          {...props.register("mascotaselector", { required: true })}
          error={props.errors.mascotaselector}
          errorMsg="Complete este campo"
          select
          options={dummy.mascota}
        />
      )}

      <InputComponent
        type="text"
        label="Vive en casa"
        placeholder=""
        icon="fa fa-user-o"
        className="mb-10"
        name="ownHouse"
        value={props?.getValues("ownHouse")}
        {...props.register("ownHouse", { required: true })}
        error={props.errors.ownHouse}
        errorMsg="Complete este campo"
        select
        options={dummy.casa}
      />
      <InputComponent
        type="text"
        label="Ingresos por año"
        placeholder=""
        value={props?.getValues("income")}
        icon="fa fa-user-o"
        className="mb-10"
        name="income"
        {...props.register("income", { required: true })}
        error={props.errors.income}
        errorMsg="Complete este campo"
        select
        options={dummy.ingresos}
      />
      <br />
      <input
        type="submit"
        className="btn-save absolute bottom-2.5 right-36"
        value="Guardar"
      />
    </>
  );
};
