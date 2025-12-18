export const mockTestSuites = [
    {
        title: "1. Input Power Test:",
        status: "PASS",
        results: [
            { id: '1.1', name: 'Apply nominal input voltage (28VDC)', value: '2.9 V', result: 'PASS' },
            { id: '1.2', name: 'Measure current draw during boot-up', value: '1.2 A', result: 'PASS' },
            { id: '1.3', name: 'Verify total power consumption (≤ 42W expected)', value: '33 W', result: 'PASS' },
        ]
    },
    {
        title: "2. 0 to –10 VDC Output Test:",
        status: "PASS",
        results: [
            { id: '2.1', name: 'Apply input reference signal', value: '-2.8 V', result: 'PASS' },
            { id: '2.2', name: 'Sweep input across range', value: '-7.5 V', result: 'PASS' },
        ]
    }
];