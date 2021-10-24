import fetchMock from 'jest-fetch-mock'
import Enzyme from 'enzyme'
// MEMO: react@17にまだ対応していないのでこのアダプターを利用する
//   参考: https://qiita.com/282Haniwa/items/dcce1ba6bb6ae541893e
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

fetchMock.enableMocks()

Enzyme.configure({ adapter: new Adapter() })
