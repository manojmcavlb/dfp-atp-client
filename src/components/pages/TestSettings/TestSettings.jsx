import React from "react";
import "./styles.css";

const testSettingsData = [
    { step: '1.1', stepName: 'Measure Resistance across 48V_OUT & 48V_RET (TB3/TB4 & TB6/TB8)', comparison: '(>= <=)', lowLt: '50', highLt: '100', unit: 'ohm', stringLt: 'NA' },
    { step: '1.2', stepName: 'Measure Resistance across PS_3 & 48V_RET (TB13 & TB14)', comparison: '(>= <=)', lowLt: '50', highLt: '100', unit: 'ohm', stringLt: 'NA' },
    { step: '1.3', stepName: 'Measure Resistance across Battery_Bus & 48V_RET (TB1/TB2 & TB5/TB7)', comparison: '(>= <=)', lowLt: '50', highLt: '100', unit: 'ohm', stringLt: 'NA' },
    { step: '1.4', stepName: 'Measure Resistance across PS_1/PS_2 & 48V_RET (TB9/TB11 & TB10/TB12)', comparison: '(>= <=)', lowLt: '50', highLt: '30000', unit: 'ohm', stringLt: 'NA' },
    { step: '1.5', stepName: 'Measure Resistance across 48V_RET & 48V_RET (TB6 & TB14)', comparison: '(>= <=)', lowLt: '2', highLt: '6', unit: 'ohm', stringLt: 'NA' },
    { step: '2.1', stepName: 'Set 3VDC 1A across PS_3 & 48V_RET (TB13 & TB14) and Read Voltage', comparison: '(>= <=)', lowLt: '2.8', highLt: '3.2', unit: 'V', stringLt: 'NA' },
    { step: '2.2', stepName: 'Measure Voltage across 48V_OUT & 48V_RET (TB3/TB4 & TB6/TB8)', comparison: '(>= <=)', lowLt: '2.8', highLt: '3.2', unit: 'V', stringLt: 'NA' },
    { step: '2.5', stepName: 'Measure DC Load Channel 1A Current across 48V_OUT & 48V_RET (TB3 & TB6)', comparison: '(>= <=)', lowLt: '0.38', highLt: '0.42', unit: 'A', stringLt: 'NA' },
    { step: '2.6', stepName: 'Measure DC Load Channel 1B Current across 48V_OUT & 48V_RET (TB4 & TB8)', comparison: '(>= <=)', lowLt: '0.38', highLt: '0.42', unit: 'A', stringLt: 'NA' },
    { step: '2.12', stepName: 'Measure Voltage across Battery_Bus & 48V_RET (TB1/TB2 & TB5/TB7)', comparison: '(>= <)', lowLt: '4.8', highLt: '5.2', unit: 'V', stringLt: 'NA' },
    { step: '2.13', stepName: 'Measure Voltage across 48V_OUT & GND (P4.1 & P4.2)', comparison: '(>= <=)', lowLt: '4.8', highLt: '5.2', unit: 'V', stringLt: 'NA' },
    { step: '2.14', stepName: 'Measure Voltage across 5V & GND (P4.3 & P4.4)', comparison: '(>= <=)', lowLt: '4.8', highLt: '5.2', unit: 'V', stringLt: 'NA' },
    { step: '2.17', stepName: 'Measure DC Load Channel 3 Current across Battery_Bus & 48V_RET (TB1 & TB5)', comparison: '(>= <=)', lowLt: '0.38', highLt: '0.42', unit: 'A', stringLt: 'NA' },
    { step: '2.18', stepName: 'Measure DC Load Channel 4 Current across Battery_Bus & 48V_RET (TB2 & TB7)', comparison: '(>= <=)', lowLt: '0.38', highLt: '0.42', unit: 'A', stringLt: 'NA' },
    { step: '2.25', stepName: 'Measure Voltage across PS_3 & 48V_RET (TB13 & TB14)', comparison: '(>= <=)', lowLt: '4.8', highLt: '5.2', unit: 'V', stringLt: 'NA' },
    { step: '2.26', stepName: 'Measure Voltage across Battery_Bus & 48V_RET (TB1/TB2 & TB5/TB7)', comparison: '(>= <=)', lowLt: '4.8', highLt: '5.2', unit: 'V', stringLt: 'NA' },
    { step: '3.2', stepName: 'Measure Voltage across J4.6 & J4.7', comparison: '(>= <=)', lowLt: '9', highLt: '12', unit: 'V', stringLt: 'NA' },
    { step: '3.3', stepName: 'Measure Frequency across J4.6 & J4.7', comparison: '(>= <=)', lowLt: '58', highLt: '62', unit: 'Hz', stringLt: 'NA' },
    { step: '3.4', stepName: 'Measure Voltage across J4.8 & J4.9', comparison: '(>= <=)', lowLt: '9', highLt: '12', unit: 'V', stringLt: 'NA' },
    { step: '3.5', stepName: 'Measure Frequency across J4.8 & J4.9', comparison: '(>= <=)', lowLt: '58', highLt: '62', unit: 'Hz', stringLt: 'NA' },
    { step: '4.4', stepName: 'Read Analog Voltage at J4.2', comparison: '(>= <=)', lowLt: '4.8', highLt: '5.2', unit: 'V', stringLt: 'NA' },
    { step: '5.1', stepName: 'Send & Read Data across PS_RMM Port (P5.7 & P5.8)', comparison: 'IgnoreCase', lowLt: 'NA', highLt: 'NA', unit: 'NA', stringLt: 'ITA3' },
    { step: 'NA', stepName: 'NA', comparison: 'NA', lowLt: 'NA', highLt: 'NA', unit: 'NA', stringLt: 'NA' }
];

function TestSettings() {
  return (
    <div className="page-bg">
      <main className="test-settings-wrap">
        <div className="header-controls">
            <select>
                <option>79281300AA AC-DC Battery Charger</option>
            </select>
        </div>
        <div className="table-container">
          <table className="test-settings-table">
            <thead>
              <tr>
                <th></th>
                <th>Step Names</th>
                <th>Comparison</th>
                <th>Low Lt</th>
                <th>High Lt</th>
                <th>Unit</th>
                <th>String Lt</th>
              </tr>
            </thead>
            <tbody>
              {testSettingsData.map((item, index) => (
                <tr key={index}>
                  <td>{item.step}</td>
                  <td>{item.stepName}</td>
                  <td>{item.comparison}</td>
                  <td>{item.lowLt}</td>
                  <td>{item.highLt}</td>
                  <td>{item.unit}</td>
                  <td>{item.stringLt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="action-buttons">
            <button>Test Settings</button>
            <button>HW Settings</button>
            <button>Edit</button>
            <button>Back</button>
        </div>
      </main>
    </div>
  );
}

export default TestSettings;