import { isActive } from "../../components/calendar/utils/event-card";

describe('is active test suit', () => {
	test("it should return active when it is active", ()=>{
		const startTime = new Date(Date.now() - 50000);
		const endTime = new Date(Date.now() + 500000);
		expect(isActive(startTime, endTime)).toBeTruthy();
	})
	test("it should return inactive when it is inactive", ()=>{
		const startTime = new Date(Date.now() + 500000);
		const endTime = new Date(Date.now() + 50000000);
		expect(isActive(startTime, endTime)).toBeFalsy();
	})
})

export {}