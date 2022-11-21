import { faker } from '@faker-js/faker'
import { SurveyModel } from '../models'


export const mockSurveyListModel = (): SurveyModel[] => ([{
  id: faker.datatype.uuid(),
  question: faker.lorem.sentence(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.lorem.sentence()
  }],
  didAnswer: faker.datatype.boolean(),
  date: faker.date.past()
}])


