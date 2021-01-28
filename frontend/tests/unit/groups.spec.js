import { shallowMount, createLocalVue } from '@vue/test-utils'
import Groups from '@/views/Groups.vue'
import {getSchedule, getFaculty} from "../../src/httpService/httpService";
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue';
import {pl} from "../../src/assets/lang";
jest.mock('../../src/httpService/httpService');

describe('Groups.vue', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(BootstrapVue);

  let vm;
  const planId = 0;
  const facultyId = 1;
  const lectureSchedules = require('../mockData/mockGetScheduleResponse');
  const faculty = require('../mockData/mockFacultyResponse');

  beforeEach(() => {
    getSchedule.mockResolvedValue(lectureSchedules);
    getFaculty.mockResolvedValue(faculty);
    const wrapper = shallowMount(Groups, {
      mocks: {
        $route: {
          params: {
            planId: planId,
            facultyId: facultyId
          }
        }
      },
      localVue
    });
    vm = wrapper.vm;
  });

  it('getGroups function sets correct data', async () => {
    await vm.getGroups();
    const lectures = lectureSchedules.lectures;
    expect(getSchedule).toHaveBeenCalledWith(planId);
    lectures.forEach((lecture) => {
      expect(vm.schedule).toContainEqual({
        lectureId: lecture.lectureId,
        code: lecture.groupNumber,
        name: lecture.course.course.name,
        tutors: lecture.conductedClasses,
        lectureTimes: lecture.lectureTime,
        hours: lecture.course.numberOfHours,
        duration: lecture.course.duration
      })
    });
  });

  it('getFaculty function gets correct structure', async () => {
    await vm.getFaculty();
    expect(getFaculty).toHaveBeenCalledWith(facultyId);
    expect(vm.faculty).toEqual({
      name: faculty.name,
      studiesLevel: pl.studiesLevel[faculty.studiesLevel],
      studiesType: pl.studiesType[faculty.studiesType],
      speciality: faculty.studentGroups.speciality,
      year: faculty.startYear
    });
  });
});
