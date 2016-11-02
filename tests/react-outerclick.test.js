import React      from 'react'
import renderer   from 'react-test-renderer'
import outerClick from '../index'

jest.mock('react-dom')

describe('Outerclick tests >', () => {

  it('renders wrapped components correctly', () => {
    class C extends React.Component {
      render(){
        return <div>{this.props.message}</div>
      }
    }

    const Component = outerClick(C);

    const tree = renderer.create(<Component message="Hi" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
