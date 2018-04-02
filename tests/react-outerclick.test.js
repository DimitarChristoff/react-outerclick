import React      from 'react'
import renderer   from 'react-test-renderer'
import outerClick from '../src/index'

jest.mock('react-dom')

describe('Outerclick tests >', () => {

  it('renders wrapped components that dont have handleClick correctly', () => {
    class C extends React.Component {
      render(){
        return <div>{this.props.message}</div>
      }
    }

    const Component = outerClick(C);

    const tree = renderer.create(<Component message="Hi" />);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.getInstance().displayName).toMatchSnapshot();
  })


  it('renders wrapped components correctly', () => {
    class C extends React.Component {
      handleOuterClick(){

      }
      render(){
        return <div>{this.props.message}</div>
      }
    }

    const Component = outerClick(C);

    const tree = renderer.create(<Component message="I  care about outerclick" />);
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.getInstance().displayName).toMatchSnapshot();
  })

})
