import React, { useState } from "react";
import { inputs, numberConditions, textConditions } from "./ApiRules";

const Main = () => {
  //
  const [state, setState] = useState({
    logical: true,
    conditions: [{ column: "Title", operator: "Equals", operand: "" }],
  });
  const ConditionGenerator = (event, index = -1) => {
    if (index !== -1) {
      let name = event.target.name;
      let value = event.target.value;
      state.conditions[index][name] = value;
    } else {
      state.conditions.push({
        column: "Title",
        operator: "Equals",
        operand: "",
      });
    }
    setState({ ...state });
  };

  // condition query generator
  const queryGenerator = () => {
    const blockSign = !state.logical ? "&&" : "||";
    let str = "";
    state.conditions.forEach((x) => {
      const sign =x.operator
      if (x.operand !== "") str += "("+x.column +" "+ sign +" "+ x.operand+") "+ blockSign;
    });

    return str.substring(0,str.length-2);
  };

  console.log(state);
  return (
    <div className="w-100 p-2 mt-3">
      <h4>Rule Group</h4>
      <div className="d-flex align-items-center ">
        <p className="m-0">Products(s) must match:</p>
        <input
          type="radio"
          name="logical"
          className="mx-2"
          defaultChecked
          onChange={() => {
            setState({ ...state, logical: true });
          }}
          id=""
        />
        <label htmlFor="">Any Conditon</label>
        <input
          type="radio"
          name="logical"
          className="mx-2"
          id=""
          onChange={() => {
            setState({ ...state, logical: false });
          }}
        />
        <label htmlFor="">All Conditon</label>
      </div>
      <div className="w-100">
        <table className="w-100 table table-borderless">
          <tbody>
            {state.conditions.map((x, i) => (
              <tr>
                <td>
                  <select
                    className="inpu rounded form-select"
                    onChange={(e) => ConditionGenerator(e, i)}
                    name="column"
                    value={state.conditions[i].column}
                    id=""
                  >
                    {Object.keys(inputs).map((x) => (
                      <option value={x}>{x}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    className="inpu rounded form-select"
                    onChange={(e) => ConditionGenerator(e, i)}
                    name="operator"
                    id=""
                    value={state.conditions[i].operator}
                  >
                    {Object.entries(
                      inputs[x.column] == "number"
                        ? numberConditions
                        : textConditions
                    ).map((x) => (
                      <option value={x[1]}>{x[0]}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    className="inpu rounded form-control py-2"
                    value={state.conditions[i].operand}
                    onChange={(e) => ConditionGenerator(e, i)}
                    name="operand"
                    type={inputs[x.column]}
                    placeholder={
                      inputs[x.column] == "text" ? "Enter text" : "Enter number"
                    }
                  />
                </td>
                <td>
                  {i !== 0 && (
                    <button
                      className="btn btn-danger"
                      onClick={(e) => {
                        state.conditions.splice(i, 1);
                        setState({ ...state });
                      }}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="btn btn-primary mx-3"
          onClick={(e) => {
            state.conditions[state.conditions.length - 1].operand != ""
              ? ConditionGenerator(e)
              : alert("Kindly fill input box.!");
          }}
        >
          Add
        </button>
        <h6 className="m-3">
          <span className="fw-bold text-primary">Query:</span>{" "}
          {queryGenerator()}
        </h6>
      </div>
    </div>
  );
};

export default Main;
