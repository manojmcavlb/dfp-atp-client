// prettier-ignore
export const mockTestSuites = [
    // ---------------- IoT Gateway Test Cases (IDs 1–18) ----------------
    {
        uut: 'IoT Gateway',
        uutId: 'UUT-1',
        powerSpec: '115VAC 360–800Hz',
        testCases: [
            {
                testId: 1,
                title: 'Connector Orientation Test',
                requirement: 'ARINC 836A',
                steps: [
                    {
                        stepId: '1.1',
                        action: 'Mount IoT Gateway on ATS fixture',
                        command: 'ats.mount(uut)',
                        expected: 'UUT mechanically secured',
                        result: 'PASS',
                    },
                    {
                        stepId: '1.2',
                        action: 'Capture connector images from multiple angles',
                        command: 'camera.capture(connector, multiAngle=true)',
                        evidence: 'img/connector_all.png',
                        result: 'PASS',
                    },
                    {
                        stepId: '1.3',
                        action:
                            'Compare pin orientation and keying against ARINC drawings',
                        command: 'vision.compare(arinc836a)',
                        expected: 'Orientation, keying and alignment compliant',
                        result: 'PASS',
                    },
                ],
            },
            {
                testId: 2,
                title: 'LED Designation Test',
                steps: [
                    {
                        stepId: '2.1',
                        action: 'Inspect enclosure for LED labels',
                        command: 'camera.capture(led_labels)',
                        expected: 'All LEDs labeled',
                        result: 'PASS',
                    },
                    {
                        stepId: '2.2',
                        action: 'Verify label position, font size and legibility',
                        command: 'vision.verifyText()',
                        expected: 'Readable at normal viewing distance',
                        result: 'PASS',
                    },
                ],
            },
            {
                testId: 3,
                title: 'Power & Consumption Test',
                limits: { powerW: 40, currentA: 1.5 },
                steps: [
                    {
                        stepId: '3.1',
                        action: 'Configure ATS power supply',
                        command: 'psu.set(115,400)',
                        expected: '115VAC @ 360–800Hz',
                        result: 'PASS',
                    },
                    {
                        stepId: '3.2',
                        action: 'Power ON IoT Gateway',
                        command: 'uut.powerOn()',
                        expected: 'Boot initiated',
                        result: 'PASS',
                    },
                    {
                        stepId: '3.3',
                        action: 'Measure steady-state current',
                        command: 'meter.current()',
                        value: '1.34A',
                        result: 'PASS',
                    },
                    {
                        stepId: '3.4',
                        action: 'Measure steady-state power',
                        command: 'meter.power()',
                        value: '37.2W',
                        result: 'PASS',
                    },
                ],
            },
            {
                testId: 4,
                title: 'USB Host Mode Test',
                steps: [
                    {
                        stepId: '4.1',
                        action: 'Insert FAT32 USB flash drive',
                        command: 'usb.insert()',
                        expected: '/dev/sda detected',
                        result: 'PASS',
                    },
                    {
                        stepId: '4.2',
                        action: 'Verify enumeration as mass storage',
                        command: 'usb.enumerate()',
                        expected: 'MSC class',
                        result: 'PASS',
                    },
                    {
                        stepId: '4.3',
                        action: 'Perform file write operation',
                        command: 'fs.write(/mnt/usb/test.txt)',
                        result: 'PASS',
                    },
                    {
                        stepId: '4.4',
                        action: 'Perform file read and checksum verify',
                        command: 'fs.readVerify(/mnt/usb/test.txt)',
                        result: 'PASS',
                    },
                ],
            },
            {
                testId: 5,
                title: 'USB Device Mode Test',
                steps: [
                    {
                        stepId: '5.1',
                        action: 'Connect IoT Gateway to PC',
                        command: 'usb.deviceMode()',
                        expected: 'USB device enumerated',
                        result: 'PASS',
                    },
                    {
                        stepId: '5.2',
                        action: 'Open serial console',
                        command: 'serial.open()',
                        expected: 'Console accessible',
                        result: 'PASS',
                    },
                    {
                        stepId: '5.3',
                        action: 'Simulate boot failure',
                        command: 'uut.simulateBootFail()',
                        expected: 'Console remains active',
                        result: 'PASS',
                    },
                ],
            },
            {
                testId: 6,
                title: 'USB Recovery Mode Test',
                steps: [
                    {
                        stepId: '6.1',
                        action: 'Enter recovery mode',
                        command: 'uut.enterRecovery()',
                        expected: 'RCM detected',
                        result: 'PASS',
                    },
                    {
                        stepId: '6.2',
                        action: 'Flash software using SDK Manager',
                        command: 'sdk.flash(image)',
                        result: 'PASS',
                    },
                    {
                        stepId: '6.3',
                        action: 'Exit recovery and verify normal boot',
                        command: 'uut.reboot()',
                        result: 'PASS',
                    },
                ],
            },
            {
                testId: 7,
                title: 'Maintenance Ethernet Test',
                steps: [
                    {
                        stepId: '7.1',
                        action: 'Connect Cat6 cable',
                        command: 'eth.linkCheck()',
                        expected: '1Gbps link',
                        result: 'PASS',
                    },
                    {
                        stepId: '7.2',
                        action: 'Perform ping and data transfer',
                        command: 'net.throughputTest()',
                        result: 'PASS',
                    },
                    {
                        stepId: '7.3',
                        action: 'Negative test with Cat5 cable',
                        command: 'eth.linkCheck(cat5)',
                        expected: 'Link downgrade or failure',
                        result: 'PASS',
                    },
                ],
            },
            {
                testId: 8,
                title: 'Software Load & Security',
                steps: [
                    {
                        stepId: '8.1',
                        action: 'Load valid signed software',
                        command: 'fw.load(valid)',
                        result: 'PASS',
                    },
                    {
                        stepId: '8.2',
                        action: 'Attempt unsigned software load',
                        command: 'fw.load(invalid)',
                        expected: 'Rejected',
                        result: 'PASS',
                    },
                ],
            },
            {
                testId: 9,
                title: '615A Device Software Reporting',
                steps: [
                    {
                        stepId: '9.1',
                        action: 'Query reported software PN/version',
                        command: 'sw.report()',
                        expected: 'Matches loaded version',
                        result: 'PASS',
                    },
                ],
            },
            {
                testId: 10,
                title: 'RTC Presence Test',
                limits: { drift: '≈1min' },
                steps: [
                    {
                        stepId: '10.1',
                        action: 'Read RTC time',
                        command: 'rtc.read()',
                        result: 'PASS',
                    },
                    {
                        stepId: '10.2',
                        action: 'Power OFF for 60 seconds',
                        command: 'uut.powerOff(60)',
                        result: 'PASS',
                    },
                    {
                        stepId: '10.3',
                        action: 'Power ON and read RTC',
                        command: 'rtc.read()',
                        result: 'PASS',
                    },
                ],
            },
            {
                testId: 11,
                title: 'RTC Backup Test',
                limits: { drift: '±2min/24h' },
                steps: [
                    {
                        stepId: '11.1',
                        action: 'Power OFF for 24 hours',
                        command: 'uut.powerOff(86400)',
                        result: 'PASS',
                    },
                    {
                        stepId: '11.2',
                        action: 'Read RTC after restore',
                        command: 'rtc.read()',
                        result: 'PASS',
                    },
                ],
            },
            {
                testId: 12,
                title: 'Unnecessary Discharge Test',
                steps: [
                    {
                        stepId: '12.1',
                        action: 'Power OFF with jumper connected',
                        command: 'rtc.verifyRetention()',
                        result: 'PASS',
                    },
                    {
                        stepId: '12.2',
                        action: 'Power OFF without jumper',
                        command: 'rtc.verifyNoRetention()',
                        result: 'PASS',
                    },
                ],
            },
            {
                testId: 13,
                title: 'LED Serviceability Test',
                steps: [
                    {
                        stepId: '13.1',
                        action: 'Send LED blink command',
                        command: 'led.blink(all)',
                        expected: 'All LEDs visible',
                        result: 'PASS',
                    },
                ],
            },
            {
                testId: 14,
                title: 'LED Color Test',
                steps: [
                    {
                        stepId: '14.1',
                        action: 'Cycle LEDs through supported colors',
                        command: 'led.cycleColors()',
                        result: 'PASS',
                    },
                ],
            },
            {
                testId: 15,
                title: 'Discrete Input Test',
                steps: [
                    {
                        stepId: '15.1',
                        action: 'Apply discrete input levels sequentially',
                        command: 'dio.applyInputs()',
                        result: 'PASS',
                    },
                    {
                        stepId: '15.2',
                        action: 'Verify software state changes',
                        command: 'dio.verifyState()',
                        result: 'PASS',
                    },
                ],
            },
            {
                testId: 16,
                title: 'Discrete Output Test',
                steps: [
                    {
                        stepId: '16.1',
                        action: 'Command outputs HIGH/LOW',
                        command: 'dio.setOutputs()',
                        result: 'PASS',
                    },
                    {
                        stepId: '16.2',
                        action: 'Measure output voltages',
                        command: 'meter.voltage()',
                        result: 'PASS',
                    },
                ],
            },
        ],
    },
];
