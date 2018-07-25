import React      from 'react'
import renderer   from 'react-test-renderer'
import outerClick from '../src/index'
import { mount }  from 'enzyme';

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
  });

  it('fires outerclick when clicked on something outside of the component', () => {

    const mock = jest.fn();
    class C extends React.Component {
      handleOuterClick(e){
        console.log('hi')
        mock(e);
      }
      render(){
        return <div className={'inner'}>{this.props.message}</div>
      }
    }

    const Component = outerClick(C);

    const tree = mount(<div>
      <button>Hi</button>
      <Component message={'I am ready'}/>
    </div>);

    tree.find('button').simulate('click');

    // todo: make this pass.
    expect(mock).toHaveBeenCalled();

  })

})
